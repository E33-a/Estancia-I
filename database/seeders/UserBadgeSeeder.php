<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserBadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = Badge::all();

        if ($badges->isEmpty()) {
            return;
        }

        User::where('role', User::ROLE_STUDENT)->get()->each(function (User $student) use ($badges) {
            // Cada alumno avanza en 2-4 insignias al azar
            $assigned = $badges->random(min($badges->count(), random_int(2, 4)));

            foreach ($assigned as $badge) {
                $completed = (bool) random_int(0, 1);
                $progressDone = $completed ? 3 : random_int(0, 2);

                $student->badges()->syncWithoutDetaching([
                    $badge->id => [
                        'progress' => "{$progressDone}/3",
                        'completed' => $completed,
                    ],
                ]);
            }
        });
    }
}
