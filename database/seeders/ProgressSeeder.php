<?php

namespace Database\Seeders;

use App\Models\Progress;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProgressSeeder extends Seeder
{
    private const TYPES = ['juego', 'video', 'cuento', 'ejercicio'];

    public function run(): void
    {
        User::where('role', User::ROLE_STUDENT)->get()->each(function (User $student) {
            $entries = random_int(4, 10);

            for ($i = 0; $i < $entries; $i++) {
                $type = self::TYPES[array_rand(self::TYPES)];

                Progress::create([
                    'user_id' => $student->id,
                    'type' => $type,
                    'item_id' => $type[0] . random_int(1, 20), // ej. 'j3', 'v1', 'c5'
                    'score' => random_int(0, 100),
                    'completed' => (bool) random_int(0, 1),
                ]);
            }
        });
    }
}
