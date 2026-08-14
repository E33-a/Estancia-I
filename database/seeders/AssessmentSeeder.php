<?php

namespace Database\Seeders;

use App\Models\Assessment;
use App\Models\AssessmentQuestion;
use Illuminate\Database\Seeder;

class AssessmentSeeder extends Seeder
{
    public function run(): void
    {
        $assessment = Assessment::updateOrCreate(
            [
                'slug' =>
                    'animales-y-naturaleza-nahuatl',
            ],
            [
                'title' =>
                    'Animales y Naturaleza en Náhuatl',

                'description' =>
                    'Demuestra lo que has aprendido sobre animales, naturaleza y vocabulario básico.',

                'language' => 'Náhuatl',
                'category' => 'Vocabulario',

                'passing_score' => 70,
                'question_limit' => 10,
                'time_limit_minutes' => 15,
                'max_attempts' => 3,

                'created_by' => null,

                'available_to_all_students' =>
                    true,

                'active' => true,
            ]
        );

        /*
         * Permite ejecutar este seeder varias veces
         * sin duplicar preguntas.
         */
        AssessmentQuestion::query()
            ->where(
                'assessment_id',
                $assessment->id
            )
            ->delete();

        $questions = [
            [
                'type' => 'image_choice',

                'prompt' =>
                    '¿Cuál de estos animales es un "Mazatl"?',

                'instructions' =>
                    'Selecciona la imagen correcta.',

                'audio_text' => 'Mazatl',

                'options' => [
                    [
                        'value' => 'Venado',
                        'label' => 'Venado',
                        'emoji' => '🦌',
                    ],
                    [
                        'value' => 'Conejo',
                        'label' => 'Conejo',
                        'emoji' => '🐇',
                    ],
                    [
                        'value' => 'Jaguar',
                        'label' => 'Jaguar',
                        'emoji' => '🐆',
                    ],
                    [
                        'value' => 'Águila',
                        'label' => 'Águila',
                        'emoji' => '🦅',
                    ],
                ],

                'correct_answer' =>
                    'Venado',

                'explanation' =>
                    'Mazatl corresponde a Venado.',

                'points' => 10,
            ],

            [
                'type' => 'multiple_choice',

                'prompt' =>
                    '¿Qué significa "Tochtli"?',

                'audio_text' => 'Tochtli',

                'options' => [
                    [
                        'value' => 'Conejo',
                        'label' => 'Conejo',
                    ],
                    [
                        'value' => 'Serpiente',
                        'label' => 'Serpiente',
                    ],
                    [
                        'value' => 'Pájaro',
                        'label' => 'Pájaro',
                    ],
                    [
                        'value' => 'Venado',
                        'label' => 'Venado',
                    ],
                ],

                'correct_answer' =>
                    'Conejo',

                'explanation' =>
                    'Tochtli corresponde a Conejo.',

                'points' => 10,
            ],

            [
                'type' => 'fill_blank',

                'prompt' =>
                    'Escribe en Náhuatl la palabra "Agua".',

                'instructions' =>
                    'Escribe solamente la palabra.',

                'correct_answer' =>
                    'Atl',

                'explanation' =>
                    'Agua se relaciona con Atl.',

                'points' => 10,
            ],

            [
                'type' => 'audio_choice',

                'prompt' =>
                    'Escucha la palabra y selecciona su significado.',

                'audio_text' =>
                    'Xochitl',

                'options' => [
                    [
                        'value' => 'Flor',
                        'label' => 'Flor',
                        'emoji' => '🌸',
                    ],
                    [
                        'value' => 'Luna',
                        'label' => 'Luna',
                        'emoji' => '🌙',
                    ],
                    [
                        'value' => 'Agua',
                        'label' => 'Agua',
                        'emoji' => '💧',
                    ],
                    [
                        'value' => 'Casa',
                        'label' => 'Casa',
                        'emoji' => '🏠',
                    ],
                ],

                'correct_answer' =>
                    'Flor',

                'explanation' =>
                    'Xochitl corresponde a Flor.',

                'points' => 10,
            ],

            [
                'type' => 'image_choice',

                'prompt' =>
                    '¿Cuál de estos animales corresponde a "Cuauhtli"?',

                'audio_text' =>
                    'Cuauhtli',

                'options' => [
                    [
                        'value' => 'Águila',
                        'label' => 'Águila',
                        'emoji' => '🦅',
                    ],
                    [
                        'value' => 'Jaguar',
                        'label' => 'Jaguar',
                        'emoji' => '🐆',
                    ],
                    [
                        'value' => 'Conejo',
                        'label' => 'Conejo',
                        'emoji' => '🐇',
                    ],
                    [
                        'value' => 'Venado',
                        'label' => 'Venado',
                        'emoji' => '🦌',
                    ],
                ],

                'correct_answer' =>
                    'Águila',

                'explanation' =>
                    'Cuauhtli corresponde a Águila.',

                'points' => 10,
            ],

            [
                'type' => 'fill_blank',

                'prompt' =>
                    '¿Cómo se dice "Casa" en Náhuatl?',

                'correct_answer' =>
                    'Calli',

                'explanation' =>
                    'Casa corresponde a Calli.',

                'points' => 10,
            ],

            [
                'type' => 'multiple_choice',

                'prompt' =>
                    '¿Qué significa "Coatl"?',

                'audio_text' =>
                    'Coatl',

                'options' => [
                    [
                        'value' => 'Serpiente',
                        'label' => 'Serpiente',
                    ],
                    [
                        'value' => 'Mariposa',
                        'label' => 'Mariposa',
                    ],
                    [
                        'value' => 'Perro',
                        'label' => 'Perro',
                    ],
                    [
                        'value' => 'Árbol',
                        'label' => 'Árbol',
                    ],
                ],

                'correct_answer' =>
                    'Serpiente',

                'explanation' =>
                    'Coatl corresponde a Serpiente.',

                'points' => 10,
            ],

            [
                'type' => 'audio_choice',

                'prompt' =>
                    'Escucha la palabra. ¿Qué significa?',

                'audio_text' =>
                    'Metztli',

                'options' => [
                    [
                        'value' => 'Luna',
                        'label' => 'Luna',
                        'emoji' => '🌙',
                    ],
                    [
                        'value' => 'Sol',
                        'label' => 'Sol',
                        'emoji' => '☀️',
                    ],
                    [
                        'value' => 'Fuego',
                        'label' => 'Fuego',
                        'emoji' => '🔥',
                    ],
                    [
                        'value' => 'Tierra',
                        'label' => 'Tierra',
                        'emoji' => '🌎',
                    ],
                ],

                'correct_answer' =>
                    'Luna',

                'explanation' =>
                    'Metztli corresponde a Luna.',

                'points' => 10,
            ],

            [
                'type' => 'fill_blank',

                'prompt' =>
                    'Escribe en Náhuatl la palabra "Jaguar".',

                'correct_answer' =>
                    'Ocelotl',

                'explanation' =>
                    'Jaguar corresponde a Ocelotl.',

                'points' => 10,
            ],

            [
                'type' => 'multiple_choice',

                'prompt' =>
                    '¿Qué significa "Tletl"?',

                'audio_text' =>
                    'Tletl',

                'options' => [
                    [
                        'value' => 'Fuego',
                        'label' => 'Fuego',
                    ],
                    [
                        'value' => 'Agua',
                        'label' => 'Agua',
                    ],
                    [
                        'value' => 'Cerro',
                        'label' => 'Cerro',
                    ],
                    [
                        'value' => 'Árbol',
                        'label' => 'Árbol',
                    ],
                ],

                'correct_answer' =>
                    'Fuego',

                'explanation' =>
                    'Tletl corresponde a Fuego.',

                'points' => 10,
            ],

            [
                'type' => 'image_choice',

                'prompt' =>
                    '¿Qué imagen representa "Papalotl"?',

                'audio_text' =>
                    'Papalotl',

                'options' => [
                    [
                        'value' => 'Mariposa',
                        'label' => 'Mariposa',
                        'emoji' => '🦋',
                    ],
                    [
                        'value' => 'Pájaro',
                        'label' => 'Pájaro',
                        'emoji' => '🐦',
                    ],
                    [
                        'value' => 'Serpiente',
                        'label' => 'Serpiente',
                        'emoji' => '🐍',
                    ],
                    [
                        'value' => 'Conejo',
                        'label' => 'Conejo',
                        'emoji' => '🐇',
                    ],
                ],

                'correct_answer' =>
                    'Mariposa',

                'explanation' =>
                    'Papalotl corresponde a Mariposa.',

                'points' => 10,
            ],

            [
                'type' => 'audio_choice',

                'prompt' =>
                    'Escucha la palabra y selecciona la respuesta correcta.',

                'audio_text' =>
                    'Tepetl',

                'options' => [
                    [
                        'value' => 'Cerro',
                        'label' => 'Cerro',
                        'emoji' => '⛰️',
                    ],
                    [
                        'value' => 'Casa',
                        'label' => 'Casa',
                        'emoji' => '🏠',
                    ],
                    [
                        'value' => 'Flor',
                        'label' => 'Flor',
                        'emoji' => '🌸',
                    ],
                    [
                        'value' => 'Árbol',
                        'label' => 'Árbol',
                        'emoji' => '🌳',
                    ],
                ],

                'correct_answer' =>
                    'Cerro',

                'explanation' =>
                    'Tepetl corresponde a Cerro.',

                'points' => 10,
            ],
        ];

        foreach (
            $questions as $index => $question
        ) {
            AssessmentQuestion::create([
                'assessment_id' =>
                    $assessment->id,

                'type' =>
                    $question['type'],

                'prompt' =>
                    $question['prompt'],

                'instructions' =>
                    $question['instructions']
                    ?? null,

                'audio_text' =>
                    $question['audio_text']
                    ?? null,

                'audio_path' => null,

                'image_url' => null,

                'options' =>
                    $question['options']
                    ?? null,

                'correct_answer' =>
                    $question['correct_answer'],

                'explanation' =>
                    $question['explanation'],

                'points' =>
                    $question['points'],

                'position' =>
                    $index + 1,

                'active' => true,
            ]);
        }
    }
}