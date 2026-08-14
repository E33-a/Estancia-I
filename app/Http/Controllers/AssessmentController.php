<?php

namespace App\Http\Controllers;

use App\Services\AchievementService;
use App\Models\Assessment;
use App\Models\AssessmentAnswer;
use App\Models\AssessmentAttempt;
use App\Models\AssessmentQuestion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentController extends Controller
{
    public function index(): Response
    {
        $userId = auth()->id();

        $assessments = Assessment::query()
            ->where('active', true)
            ->where(function ($query) use ($userId) {
                $query
                    ->where(
                        'available_to_all_students',
                        true
                    )
                    ->orWhereHas(
                        'students',
                        function ($studentQuery) use ($userId) {
                            $studentQuery->where(
                                'users.id',
                                $userId
                            );
                        }
                    );
            })
            ->with([
                'attempts' => function ($query) use ($userId) {
                    $query
                        ->where('user_id', $userId)
                        ->latest();
                },
            ])
            ->orderBy('title')
            ->get()
            ->map(function (Assessment $assessment) {
                $completed = $assessment->attempts
                    ->where('status', 'completed');

                $inProgress = $assessment->attempts
                    ->firstWhere(
                        'status',
                        'in_progress'
                    );

                $bestScore = $completed->max('percentage');

                return [
                    'id' => $assessment->id,
                    'slug' => $assessment->slug,
                    'title' => $assessment->title,
                    'description' => $assessment->description,
                    'language' => $assessment->language,
                    'category' => $assessment->category,
                    'passingScore' => $assessment->passing_score,
                    'questionLimit' => $assessment->question_limit,
                    'timeLimit' => $assessment->time_limit_minutes,
                    'maxAttempts' => $assessment->max_attempts,
                    'attemptsUsed' => $completed->count(),
                    'bestScore' => $bestScore,
                    'inProgressAttempt' => $inProgress?->id,
                    'lastCompletedAttempt' => $completed->first()?->id,
                ];
            })
            ->values()
            ->all();

        return Inertia::render(
            'Student/Assessments/Index',
            [
                'assessments' => $assessments,
            ]
        );
    }

    public function start(
        Assessment $assessment
    ): RedirectResponse {
        abort_unless(
            $this->canAccessAssessment($assessment),
            403
        );

        /*
         * Si ya existe un intento en proceso,
         * continuamos ese mismo.
         */
        $existingAttempt = AssessmentAttempt::query()
            ->where('assessment_id', $assessment->id)
            ->where('user_id', auth()->id())
            ->where('status', 'in_progress')
            ->latest()
            ->first();

        if ($existingAttempt) {
            return redirect()->route(
                'assessments.take',
                $existingAttempt
            );
        }

        $completedAttempts = AssessmentAttempt::query()
            ->where('assessment_id', $assessment->id)
            ->where('user_id', auth()->id())
            ->where('status', 'completed')
            ->count();

        if (
            $completedAttempts >=
            $assessment->max_attempts
        ) {
            return back()->with(
                'error',
                'Ya utilizaste todos los intentos disponibles.'
            );
        }

        $questionIds = $assessment
            ->questions()
            ->where('active', true)
            ->inRandomOrder()
            ->limit($assessment->question_limit)
            ->pluck('id')
            ->values()
            ->all();

        if (count($questionIds) === 0) {
            return back()->with(
                'error',
                'Esta evaluación todavía no tiene preguntas.'
            );
        }

        $attempt = AssessmentAttempt::create([
            'assessment_id' => $assessment->id,
            'user_id' => auth()->id(),
            'status' => 'in_progress',
            'question_ids' => $questionIds,
            'total_questions' => count($questionIds),
            'started_at' => now(),
        ]);

        return redirect()->route(
            'assessments.take',
            $attempt
        );
    }

    public function take(
        AssessmentAttempt $attempt
    ): Response|RedirectResponse {
        $this->authorizeAttempt($attempt);

        if ($attempt->status === 'completed') {
            return redirect()->route(
                'assessments.result',
                $attempt
            );
        }

        $attempt->load('assessment');

        $questions = AssessmentQuestion::query()
            ->whereIn(
                'id',
                $attempt->question_ids
            )
            ->get()
            ->keyBy('id');

        /*
         * Respetamos exactamente el orden almacenado
         * en question_ids.
         */
        $orderedQuestions = collect(
            $attempt->question_ids
        )
            ->map(
                fn ($id) =>
                    $questions->get($id)
            )
            ->filter()
            ->map(function (AssessmentQuestion $question) {
                /*
                 * IMPORTANTE:
                 * correct_answer NO se envía al navegador.
                 */
                return [
                    'id' => $question->id,
                    'type' => $question->type,
                    'prompt' => $question->prompt,
                    'instructions' => $question->instructions,
                    'audioText' => $question->audio_text,

                    'audioUrl' => $question->audio_path
                        ? asset(
                            'storage/' .
                            $question->audio_path
                        )
                        : null,

                    'imageUrl' => $question->image_url,

                    'options' => collect(
                        $question->options ?? []
                    )
                        ->shuffle()
                        ->values()
                        ->all(),

                    'points' => $question->points,
                ];
            })
            ->values()
            ->all();

        $elapsedSeconds = $attempt->started_at
    ? (int) floor(
        $attempt->started_at->diffInSeconds(
            now()
        )
    )
    : 0;

        $totalSeconds =
            $attempt->assessment->time_limit_minutes *
            60;

        $remainingSeconds = (int) max(
    0,
    $totalSeconds - $elapsedSeconds
);

        return Inertia::render(
            'Student/Assessments/Take',
            [
                'assessment' => [
                    'id' => $attempt->assessment->id,
                    'title' => $attempt->assessment->title,
                    'description' =>
                        $attempt->assessment->description,
                    'language' =>
                        $attempt->assessment->language,
                    'passingScore' =>
                        $attempt->assessment->passing_score,
                    'timeLimit' =>
                        $attempt->assessment->time_limit_minutes,
                ],

                'attempt' => [
                    'id' => $attempt->id,
                    'remainingSeconds' =>
                        $remainingSeconds,
                ],

                'questions' =>
                    $orderedQuestions,
            ]
        );
    }

    public function submit(
        Request $request,
        AssessmentAttempt $attempt
    ): RedirectResponse {
        $this->authorizeAttempt($attempt);

        if ($attempt->status === 'completed') {
            return redirect()->route(
                'assessments.result',
                $attempt
            );
        }

        $data = $request->validate([
            'answers' => [
                'required',
                'array',
            ],

            'elapsed_seconds' => [
                'nullable',
                'integer',
                'min:0',
            ],
        ]);

        $questions = AssessmentQuestion::query()
            ->whereIn(
                'id',
                $attempt->question_ids
            )
            ->get()
            ->keyBy('id');

        $score = 0;
        $maximumScore = 0;
        $correctCount = 0;

        DB::transaction(function () use (
            $attempt,
            $questions,
            $data,
            &$score,
            &$maximumScore,
            &$correctCount
        ) 
        {
            AssessmentAnswer::query()
                ->where(
                    'attempt_id',
                    $attempt->id
                )
                ->delete();

            foreach (
                $attempt->question_ids
                as $questionId
            ) {
                $question =
                    $questions->get(
                        $questionId
                    );

                if (!$question) {
                    continue;
                }

                $maximumScore +=
                    $question->points;

                $submittedAnswer =
                    $data['answers'][
                        (string) $questionId
                    ] ??
                    $data['answers'][
                        $questionId
                    ] ??
                    '';

                $isCorrect =
                    $this->normalizeAnswer(
                        (string) $submittedAnswer
                    ) ===
                    $this->normalizeAnswer(
                        $question->correct_answer
                    );

                $pointsEarned =
                    $isCorrect
                        ? $question->points
                        : 0;

                if ($isCorrect) {
                    $correctCount++;
                    $score += $pointsEarned;
                }

                AssessmentAnswer::create([
                    'attempt_id' =>
                        $attempt->id,

                    'question_id' =>
                        $question->id,

                    'answer' =>
                        (string) $submittedAnswer,

                    'is_correct' =>
                        $isCorrect,

                    'points_earned' =>
                        $pointsEarned,
                ]);
            }

            $percentage =
                $maximumScore > 0
                    ? round(
                        ($score /
                            $maximumScore) *
                            100,
                        2
                    )
                    : 0;

            $attempt->update([
                'status' => 'completed',
                'score' => $score,
                'max_score' => $maximumScore,
                'percentage' => $percentage,
                'correct_count' => $correctCount,
                'total_questions' =>
                    count(
                        $attempt->question_ids
                    ),
                'elapsed_seconds' =>
                    $data['elapsed_seconds'] ??
                    0,
                'submitted_at' => now(),
            ]);
        });
        app(AchievementService::class)
            ->sync(auth()->user());

        return redirect()->route(
            'assessments.result',
            $attempt
        );
    }

    public function result(
        AssessmentAttempt $attempt
    ): Response {
        $this->authorizeAttempt($attempt);

        abort_unless(
            $attempt->status === 'completed',
            404
        );

        $attempt->load([
            'assessment',
            'answers.question',
        ]);

        $passed =
            $attempt->percentage >=
            $attempt->assessment->passing_score;

        return Inertia::render(
            'Student/Assessments/Result',
            [
                'result' => [
                    'attemptId' => $attempt->id,

                    'assessmentTitle' =>
                        $attempt->assessment->title,

                    'percentage' =>
                        $attempt->percentage,

                    'score' =>
                        $attempt->score,

                    'maxScore' =>
                        $attempt->max_score,

                    'correctCount' =>
                        $attempt->correct_count,

                    'totalQuestions' =>
                        $attempt->total_questions,

                    'passingScore' =>
                        $attempt->assessment->passing_score,

                    'passed' => $passed,

                    'elapsedSeconds' =>
                        $attempt->elapsed_seconds,

                    'answers' =>
                        $attempt->answers
                            ->map(function (
                                AssessmentAnswer $answer
                            ) {
                                return [
                                    'id' =>
                                        $answer->id,

                                    'question' =>
                                        $answer
                                            ->question
                                            ->prompt,

                                    'answer' =>
                                        $answer->answer,

                                    'correctAnswer' =>
                                        $answer
                                            ->question
                                            ->correct_answer,

                                    'isCorrect' =>
                                        $answer
                                            ->is_correct,

                                    'pointsEarned' =>
                                        $answer
                                            ->points_earned,

                                    'explanation' =>
                                        $answer
                                            ->question
                                            ->explanation,
                                ];
                            })
                            ->values()
                            ->all(),
                ],
            ]
        );
    }

    private function authorizeAttempt(
        AssessmentAttempt $attempt
    ): void {
        abort_unless(
            $attempt->user_id === auth()->id(),
            403
        );
    }

    private function canAccessAssessment(
        Assessment $assessment
    ): bool {
        if (!$assessment->active) {
            return false;
        }

        if (
            $assessment
                ->available_to_all_students
        ) {
            return true;
        }

        return $assessment
            ->students()
            ->where(
                'users.id',
                auth()->id()
            )
            ->exists();
    }

    private function normalizeAnswer(
        string $value
    ): string {
        return Str::of($value)
            ->trim()
            ->lower()
            ->ascii()
            ->replaceMatches(
                '/\s+/',
                ' '
            )
            ->toString();
    }
}