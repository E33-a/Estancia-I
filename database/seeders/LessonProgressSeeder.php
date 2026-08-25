<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\User;
use Illuminate\Database\Seeder;

class LessonProgressSeeder extends Seeder
{
    public function run(): void
    {
        $lessons = Lesson::all();

        if ($lessons->isEmpty()) {
            return;
        }

        User::where('role', User::ROLE_STUDENT)->get()->each(function (User $student) use ($lessons) {
            // Cada alumno tiene progreso en 1-3 lecciones al azar
            $studentLessons = $lessons->random(min($lessons->count(), random_int(1, 3)));

            foreach ($studentLessons as $lesson) {
                $completed = (bool) random_int(0, 1);
                $startedAt = now()->subDays(random_int(1, 20));

                LessonProgress::updateOrCreate(
                    [
                        'user_id' => $student->id,
                        'lesson_id' => $lesson->id,
                    ],
                    [
                        'current_position' => $completed
                            ? $lesson->vocabularyItems()->count()
                            : random_int(0, max(1, $lesson->vocabularyItems()->count() - 1)),
                        'started_at' => $startedAt,
                        'completed_at' => $completed ? $startedAt->copy()->addMinutes(random_int(5, 30)) : null,
                        'stars_awarded' => $completed,
                    ]
                );
            }
        });
    }
}
