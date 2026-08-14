<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LessonController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Catálogo
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $userId = auth()->id();

        $lessons = Lesson::query()
            ->where('active', true)
            ->withCount('vocabularyItems')
            ->orderBy('sort_order')
            ->get()
            ->map(function ($lesson) use ($userId) {
                $progress = LessonProgress::query()
                    ->where('user_id', $userId)
                    ->where('lesson_id', $lesson->id)
                    ->first();

                return [
                    'id' => $lesson->id,

                    'slug' => $lesson->slug,

                    'title' => $lesson->title,

                    'description' => $lesson->description,

                    'category' => $lesson->category,

                    'level' => $lesson->level,

                    'language' => $lesson->language,

                    'starsReward' =>
                        $lesson->stars_reward,

                    'itemsCount' =>
                        $lesson->vocabulary_items_count,

                    'currentPosition' =>
                        $progress?->current_position ?? 0,

                    'completed' =>
                        (bool) $progress?->completed_at,
                ];
            });

        return Inertia::render(
            'Student/Lessons/Index',
            [
                'lessons' => $lessons,
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Abrir lección
    |--------------------------------------------------------------------------
    */

    public function show(Lesson $lesson)
    {
        abort_unless(
            $lesson->active,
            404
        );

        $items =
            $lesson
                ->vocabularyItems()
                ->get();

        $progress =
            LessonProgress::firstOrCreate(
                [
                    'user_id' =>
                        auth()->id(),

                    'lesson_id' =>
                        $lesson->id,
                ],
                [
                    'current_position' => 0,

                    'started_at' => now(),
                ]
            );

        return Inertia::render(
            'Student/Lessons/Show',
            [
                'lesson' => [
                    'id' => $lesson->id,

                    'slug' =>
                        $lesson->slug,

                    'title' =>
                        $lesson->title,

                    'description' =>
                        $lesson->description,

                    'category' =>
                        $lesson->category,

                    'level' =>
                        $lesson->level,

                    'starsReward' =>
                        $lesson->stars_reward,
                ],

                'items' =>
                    $items
                        ->map(
                            fn ($item) => [
                                'id' =>
                                    $item->id,

                                'spanish' =>
                                    $item->spanish,

                                'nahuatl' =>
                                    $item->target,

                                'emoji' =>
                                    $item->emoji,

                                'category' =>
                                    $item->category,

                                'audioUrl' =>
                                    $item->audio_path
                                        ? asset(
                                            'storage/' .
                                            $item->audio_path
                                        )
                                        : null,
                            ]
                        )
                        ->values(),

                'progress' => [
                    'currentPosition' =>
                        min(
                            $progress
                                ->current_position,
                            max(
                                0,
                                $items->count() - 1
                            )
                        ),

                    'completed' =>
                        (bool)
                        $progress->completed_at,
                ],
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Guardar posición
    |--------------------------------------------------------------------------
    */

    public function progress(
        Request $request,
        Lesson $lesson
    ) {
        $data = $request->validate([
            'current_position' => [
                'required',
                'integer',
                'min:0',
            ],
        ]);

        $maxPosition =
            max(
                0,
                $lesson
                    ->vocabularyItems()
                    ->count() - 1
            );

        $position =
            min(
                $data['current_position'],
                $maxPosition
            );

        LessonProgress::updateOrCreate(
            [
                'user_id' =>
                    auth()->id(),

                'lesson_id' =>
                    $lesson->id,
            ],
            [
                'current_position' =>
                    $position,

                'started_at' =>
                    now(),
            ]
        );

        return back();
    }

    /*
    |--------------------------------------------------------------------------
    | Completar lección
    |--------------------------------------------------------------------------
    */

    public function complete(
        Lesson $lesson
    ) {
        DB::transaction(
            function () use ($lesson) {
                $progress =
                    LessonProgress::firstOrCreate(
                        [
                            'user_id' =>
                                auth()->id(),

                            'lesson_id' =>
                                $lesson->id,
                        ],
                        [
                            'started_at' =>
                                now(),
                        ]
                    );

                $progress->current_position =
                    max(
                        0,
                        $lesson
                            ->vocabularyItems()
                            ->count() - 1
                    );

                $progress->completed_at ??=
                    now();

                /*
                 * Solo entregar las estrellas
                 * una vez.
                 */
                if (
                    !$progress
                        ->stars_awarded
                ) {
                    DB::table(
                        'student_profiles'
                    )
                        ->where(
                            'user_id',
                            auth()->id()
                        )
                        ->increment(
                            'stars',
                            $lesson
                                ->stars_reward
                        );

                    $progress
                        ->stars_awarded =
                        true;
                }

                $progress->save();
            }
        );

        return redirect()
            ->route(
                'lessons.index'
            )
            ->with(
                'success',
                '¡Lección completada!'
            );
    }
}