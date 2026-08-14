<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            /*
            |--------------------------------------------------------------------------
            | Insignias de cuentos
            |--------------------------------------------------------------------------
            */

            [
                'slug' => 'primer-relato',

                'name' => 'Primer Relato',

                'description' =>
                    'Diste tu primer paso dentro de las historias de Raíces Vivas.',

                'icon' => 'auto_stories',

                'color' => 'primary',

                'unlock_type' =>
                    'stories_completed',

                'unlock_value' => 1,

                'unlock_text' =>
                    'Completa 1 cuento para desbloquear esta insignia.',

                'stars_reward' => 25,

                'sort_order' => 1,
            ],

            [
                'slug' =>
                    'heroe-de-historias',

                'name' =>
                    'Héroe de Historias',

                'description' =>
                    'Has explorado varias historias y fortalecido tu aprendizaje.',

                'icon' =>
                    'menu_book',

                'color' =>
                    'secondary',

                'unlock_type' =>
                    'stories_completed',

                'unlock_value' =>
                    3,

                'unlock_text' =>
                    'Completa 3 cuentos para desbloquear esta insignia.',

                'stars_reward' =>
                    50,

                'sort_order' =>
                    2,
            ],

            [
                'slug' =>
                    'guardian-de-relatos',

                'name' =>
                    'Guardián de Relatos',

                'description' =>
                    'Tu recorrido por las historias te convierte en guardián de su memoria.',

                'icon' =>
                    'local_library',

                'color' =>
                    'tertiary',

                'unlock_type' =>
                    'stories_completed',

                'unlock_value' =>
                    5,

                'unlock_text' =>
                    'Completa 5 cuentos para desbloquear esta insignia.',

                'stars_reward' =>
                    75,

                'sort_order' =>
                    3,
            ],

            /*
            |--------------------------------------------------------------------------
            | Insignias de evaluaciones
            |--------------------------------------------------------------------------
            */

            [
                'slug' =>
                    'primer-desafio',

                'name' =>
                    'Primer Desafío',

                'description' =>
                    'Superaste tu primera evaluación.',

                'icon' =>
                    'task_alt',

                'color' =>
                    'secondary',

                'unlock_type' =>
                    'assessments_passed',

                'unlock_value' =>
                    1,

                'unlock_text' =>
                    'Aprueba 1 evaluación para desbloquear esta insignia.',

                'stars_reward' =>
                    25,

                'sort_order' =>
                    4,
            ],

            [
                'slug' =>
                    'sabio-del-conocimiento',

                'name' =>
                    'Sabio del Conocimiento',

                'description' =>
                    'Tu constancia en las evaluaciones demuestra cuánto has aprendido.',

                'icon' =>
                    'psychology',

                'color' =>
                    'primary',

                'unlock_type' =>
                    'assessments_passed',

                'unlock_value' =>
                    3,

                'unlock_text' =>
                    'Aprueba 3 evaluaciones para desbloquear esta insignia.',

                'stars_reward' =>
                    50,

                'sort_order' =>
                    5,
            ],

            [
                'slug' =>
                    'maestro-del-saber',

                'name' =>
                    'Maestro del Saber',

                'description' =>
                    'Alcanzaste una calificación sobresaliente.',

                'icon' =>
                    'workspace_premium',

                'color' =>
                    'tertiary',

                'unlock_type' =>
                    'best_assessment_score',

                'unlock_value' =>
                    90,

                'unlock_text' =>
                    'Obtén 90% o más en una evaluación para desbloquear esta insignia.',

                'stars_reward' =>
                    100,

                'sort_order' =>
                    6,
            ],

            /*
            |--------------------------------------------------------------------------
            | Insignias de juegos
            |--------------------------------------------------------------------------
            */

            [
                'slug' =>
                    'primer-juego-superado',

                'name' =>
                    'Primer Paso Jugador',

                'description' =>
                    'Completaste tu primer juego educativo.',

                'icon' =>
                    'sports_esports',

                'color' =>
                    'secondary',

                'unlock_type' =>
                    'games_won',

                'unlock_value' =>
                    1,

                'unlock_text' =>
                    'Completa correctamente 1 juego.',

                'stars_reward' =>
                    25,

                'sort_order' =>
                    7,
            ],

            [
                'slug' =>
                    'explorador-de-juegos',

                'name' =>
                    'Explorador de Juegos',

                'description' =>
                    'Superaste todos los tipos de juegos de Raíces Vivas.',

                'icon' =>
                    'explore',

                'color' =>
                    'primary',

                'unlock_type' =>
                    'unique_games_completed',

                'unlock_value' =>
                    6,

                'unlock_text' =>
                    'Completa al menos una vez los 6 tipos de juegos.',

                'stars_reward' =>
                    100,

                'sort_order' =>
                    8,
            ],

            [
                'slug' =>
                    'partida-perfecta',

                'name' =>
                    'Partida Perfecta',

                'description' =>
                    'Completaste un juego sin perder ninguna vida.',

                'icon' =>
                    'verified',

                'color' =>
                    'tertiary',

                'unlock_type' =>
                    'perfect_games',

                'unlock_value' =>
                    1,

                'unlock_text' =>
                    'Completa un juego conservando tus 8 vidas.',

                'stars_reward' =>
                    50,

                'sort_order' =>
                    9,
            ],

            [
                'slug' =>
                    'maestro-del-memorama',

                'name' =>
                    'Maestro del Memorama',

                'description' =>
                    'Tu memoria se ha convertido en una poderosa herramienta de aprendizaje.',

                'icon' =>
                    'grid_view',

                'color' =>
                    'secondary',

                'unlock_type' =>
                    'memory_wins',

                'unlock_value' =>
                    5,

                'unlock_text' =>
                    'Completa el Memorama 5 veces.',

                'stars_reward' =>
                    75,

                'sort_order' =>
                    10,
            ],
        ];

        /*
        |--------------------------------------------------------------------------
        | Crear o actualizar insignias
        |--------------------------------------------------------------------------
        */

        foreach ($badges as $badge) {
            $existing =
                DB::table('badges')
                    ->where(
                        'slug',
                        $badge['slug']
                    )
                    ->first();

            $data = [
                'name' =>
                    $badge['name'],

                'description' =>
                    $badge['description'],

                'icon' =>
                    $badge['icon'],

                'color' =>
                    $badge['color'],

                'unlock_type' =>
                    $badge['unlock_type'],

                'unlock_value' =>
                    $badge['unlock_value'],

                'unlock_text' =>
                    $badge['unlock_text'],

                'stars_reward' =>
                    $badge['stars_reward'],

                'sort_order' =>
                    $badge['sort_order'],

                'active' =>
                    true,

                'updated_at' =>
                    now(),
            ];

            /*
             * Solo establecemos created_at
             * cuando se crea por primera vez.
             */
            if (!$existing) {
                $data['created_at'] =
                    now();
            }

            DB::table('badges')
                ->updateOrInsert(
                    [
                        'slug' =>
                            $badge['slug'],
                    ],
                    $data
                );
        }
    }
}