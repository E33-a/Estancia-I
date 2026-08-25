<?php

namespace Database\Seeders;

use App\Models\Assessment;
use App\Models\AssessmentAnswer;
use App\Models\AssessmentAttempt;
use App\Models\User;
use Illuminate\Database\Seeder;

class AssessmentAttemptSeeder extends Seeder
{
    public function run(): void
    {
        $assessments = Assessment::with('questions')->get();
        $students = User::where('role', User::ROLE_STUDENT)->get();
        $teacherId = User::where('role', User::ROLE_TEACHER)->value('id');

        if ($assessments->isEmpty() || $students->isEmpty()) {
            return;
        }

        foreach ($assessments as $assessment) {
            $questions = $assessment->questions;

            if ($questions->isEmpty()) {
                continue;
            }

            foreach ($students as $student) {
                // Asignar la evaluación al alumno
                $assessment->students()->syncWithoutDetaching([
                    $student->id => [
                        'assigned_by' => $teacherId,
                        'due_at' => now()->addDays(random_int(3, 14)),
                    ],
                ]);

                // No todos los alumnos ya presentaron el examen
                if (random_int(0, 100) > 70) {
                    continue;
                }

                $questionIds = $questions->pluck('id')->all();
                $maxScore = $questions->sum('points');

                $startedAt = now()->subDays(random_int(1, 15));
                $submittedAt = $startedAt->copy()->addMinutes(random_int(5, $assessment->time_limit_minutes));

                $attempt = AssessmentAttempt::create([
                    'assessment_id' => $assessment->id,
                    'user_id' => $student->id,
                    'status' => 'completed',
                    'question_ids' => $questionIds,
                    'score' => 0,
                    'max_score' => $maxScore,
                    'percentage' => 0,
                    'correct_count' => 0,
                    'total_questions' => count($questionIds),
                    'elapsed_seconds' => $submittedAt->diffInSeconds($startedAt),
                    'started_at' => $startedAt,
                    'submitted_at' => $submittedAt,
                ]);

                $score = 0;
                $correctCount = 0;

                foreach ($questions as $question) {
                    // 70% de probabilidad de acertar
                    $isCorrect = random_int(0, 100) <= 70;
                    $pointsEarned = $isCorrect ? $question->points : 0;

                    $score += $pointsEarned;
                    $correctCount += $isCorrect ? 1 : 0;

                    AssessmentAnswer::create([
                        'attempt_id' => $attempt->id,
                        'question_id' => $question->id,
                        'answer' => $isCorrect
                            ? $question->correct_answer
                            : 'respuesta-incorrecta-simulada',
                        'is_correct' => $isCorrect,
                        'points_earned' => $pointsEarned,
                    ]);
                }

                $attempt->update([
                    'score' => $score,
                    'correct_count' => $correctCount,
                    'percentage' => $maxScore > 0 ? round(($score / $maxScore) * 100, 2) : 0,
                ]);
            }
        }
    }
}
