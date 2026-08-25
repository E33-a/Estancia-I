<?php

namespace Database\Seeders;

use App\Models\GameResult;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GameResultSeeder extends Seeder
{
    private const GAME_KEYS = [
        'memoria-nahuatl',
        'ahorcado-otomi',
        'rompecabezas-maya',
        'sopa-de-letras',
    ];

    public function run(): void
    {
        User::where('role', User::ROLE_STUDENT)->get()->each(function (User $student) {
            $plays = random_int(3, 8);

            for ($i = 0; $i < $plays; $i++) {
                $maxLives = 8;
                $livesRemaining = random_int(0, $maxLives);
                $won = $livesRemaining > 0;

                GameResult::create([
                    'result_uuid' => (string) Str::uuid(),
                    'user_id' => $student->id,
                    'game_key' => self::GAME_KEYS[array_rand(self::GAME_KEYS)],
                    'score' => random_int(0, 500),
                    'earned_stars' => $won ? random_int(1, 3) : 0,
                    'lives_remaining' => $livesRemaining,
                    'max_lives' => $maxLives,
                    'elapsed_seconds' => random_int(30, 300),
                    'won' => $won,
                    'metadata' => [
                        'streak' => random_int(0, 5),
                        'difficulty' => ['facil', 'medio', 'dificil'][array_rand(['facil', 'medio', 'dificil'])],
                    ],
                    'played_at' => now()->subDays(random_int(0, 30))->subMinutes(random_int(0, 600)),
                ]);
            }
        });
    }
}
