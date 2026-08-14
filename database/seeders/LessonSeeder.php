<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\VocabularyItem;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Lección 1: Animales
        |--------------------------------------------------------------------------
        */

        $animals = Lesson::updateOrCreate(
            [
                'slug' => 'animales-en-nahuatl',
            ],
            [
                'title' => 'Animales en Náhuatl',

                'description' =>
                    'Aprende los nombres de algunos animales en Náhuatl y practica su pronunciación.',

                'category' => 'Animales',

                'level' => 'Básico',

                'language' => 'Náhuatl',

                'stars_reward' => 10,

                'sort_order' => 1,

                'active' => true,
            ]
        );

        $animalWords = [
            'Conejo',
            'Jaguar',
            'Águila',
            'Perro',
            'Venado',
            'Serpiente',
            'Mariposa',
            'Pájaro',
        ];

        $this->attachWords(
            $animals,
            $animalWords
        );

        /*
        |--------------------------------------------------------------------------
        | Lección 2: Naturaleza
        |--------------------------------------------------------------------------
        */

        $nature = Lesson::updateOrCreate(
            [
                'slug' => 'naturaleza-en-nahuatl',
            ],
            [
                'title' => 'Naturaleza en Náhuatl',

                'description' =>
                    'Conoce palabras relacionadas con la naturaleza y el entorno.',

                'category' => 'Naturaleza',

                'level' => 'Básico',

                'language' => 'Náhuatl',

                'stars_reward' => 10,

                'sort_order' => 2,

                'active' => true,
            ]
        );

        $natureWords = [
            'Agua',
            'Tierra',
            'Flor',
            'Luna',
            'Fuego',
            'Sol',
            'Cerro',
            'Árbol',
        ];

        $this->attachWords(
            $nature,
            $natureWords
        );

        /*
        |--------------------------------------------------------------------------
        | Lección 3: Vida cotidiana
        |--------------------------------------------------------------------------
        */

        $daily = Lesson::updateOrCreate(
            [
                'slug' => 'vida-cotidiana-en-nahuatl',
            ],
            [
                'title' => 'Vida Cotidiana',

                'description' =>
                    'Aprende vocabulario básico relacionado con la vida cotidiana.',

                'category' => 'Vida cotidiana',

                'level' => 'Básico',

                'language' => 'Náhuatl',

                'stars_reward' => 10,

                'sort_order' => 3,

                'active' => true,
            ]
        );

        $dailyWords = [
            'Casa',
        ];

        $this->attachWords(
            $daily,
            $dailyWords
        );
    }

    private function attachWords(
        Lesson $lesson,
        array $spanishWords
    ): void {
        $items = VocabularyItem::query()
            ->whereIn(
                'spanish',
                $spanishWords
            )
            ->get();

        $sync = [];

        foreach (
            $spanishWords as $position => $spanish
        ) {
            $item = $items->firstWhere(
                'spanish',
                $spanish
            );

            if (!$item) {
                continue;
            }

            $sync[$item->id] = [
                'position' => $position,
            ];
        }

        $lesson
            ->vocabularyItems()
            ->sync($sync);
    }
}