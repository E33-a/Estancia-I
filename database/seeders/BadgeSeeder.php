<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
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
                'slug' => 'heroe-de-historias',

                'name' =>
                    'Héroe de Historias',

                'description' =>
                    'Has explorado varias historias y fortalecido tu aprendizaje.',

                'icon' => 'menu_book',
                'color' => 'secondary',

                'unlock_type' =>
                    'stories_completed',

                'unlock_value' => 3,

                'unlock_text' =>
                    'Completa 3 cuentos para desbloquear esta insignia.',

                'stars_reward' => 50,
                'sort_order' => 2,
            ],

            [
                'slug' => 'guardian-de-relatos',

                'name' =>
                    'Guardián de Relatos',

                'description' =>
                    'Tu recorrido por las historias te convierte en guardián de su memoria.',

                'icon' => 'local_library',
                'color' => 'tertiary',

                'unlock_type' =>
                    'stories_completed',

                'unlock_value' => 5,

                'unlock_text' =>
                    'Completa 5 cuentos para desbloquear esta insignia.',

                'stars_reward' => 75,
                'sort_order' => 3,
            ],

            [
                'slug' => 'primer-desafio',

                'name' =>
                    'Primer Desafío',

                'description' =>
                    'Superaste tu primera evaluación.',

                'icon' => 'task_alt',
                'color' => 'secondary',

                'unlock_type' =>
                    'assessments_passed',

                'unlock_value' => 1,

                'unlock_text' =>
                    'Aprueba 1 evaluación para desbloquear esta insignia.',

                'stars_reward' => 25,
                'sort_order' => 4,
            ],

            [
                'slug' =>
                    'sabio-del-conocimiento',

                'name' =>
                    'Sabio del Conocimiento',

                'description' =>
                    'Tu constancia en las evaluaciones demuestra cuánto has aprendido.',

                'icon' => 'psychology',
                'color' => 'primary',

                'unlock_type' =>
                    'assessments_passed',

                'unlock_value' => 3,

                'unlock_text' =>
                    'Aprueba 3 evaluaciones para desbloquear esta insignia.',

                'stars_reward' => 50,
                'sort_order' => 5,
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

                'color' => 'tertiary',

                'unlock_type' =>
                    'best_assessment_score',

                'unlock_value' => 90,

                'unlock_text' =>
                    'Obtén 90% o más en una evaluación para desbloquear esta insignia.',

                'stars_reward' => 100,
                'sort_order' => 6,
            ],
        ];

        foreach ($badges as $badge) {
            DB::table('badges')->updateOrInsert(
                [
                    'slug' => $badge['slug'],
                ],
                [
                    ...$badge,

                    'active' => true,

                    'updated_at' => now(),

                    'created_at' =>
                        DB::table('badges')
                            ->where(
                                'slug',
                                $badge['slug']
                            )
                            ->value('created_at')
                        ?? now(),
                ]
            );
        }
    }
}