<?php

namespace App\Http\Controllers;

use App\Models\AssessmentAttempt;
use App\Models\StoryProgress;
use App\Services\AchievementService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(
        AchievementService $achievementService
    ): Response {
        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Sincronizar logros
        |--------------------------------------------------------------------------
        */

        $stats =
            $achievementService->sync(
                $user
            );

        /*
        |--------------------------------------------------------------------------
        | Perfil actualizado
        |--------------------------------------------------------------------------
        */

        $profile = DB::table(
            'student_profiles'
        )
            ->where(
                'user_id',
                $user->id
            )
            ->first();

        /*
        |--------------------------------------------------------------------------
        | Insignias
        |--------------------------------------------------------------------------
        */

        $badges = DB::table('badges')
            ->leftJoin(
                'user_badges',
                function ($join) use ($user) {
                    $join
                        ->on(
                            'badges.id',
                            '=',
                            'user_badges.badge_id'
                        )
                        ->where(
                            'user_badges.user_id',
                            '=',
                            $user->id
                        );
                }
            )
            ->where(
                'badges.active',
                true
            )
            ->whereNotNull(
                'badges.slug'
            )
            ->orderBy(
                'badges.sort_order'
            )
            ->select([
                'badges.id',
                'badges.slug',
                'badges.name',
                'badges.description',
                'badges.icon',
                'badges.color',
                'badges.unlock_type',
                'badges.unlock_value',
                'badges.unlock_text',
                'badges.stars_reward',
                'user_badges.earned_at',
            ])
            ->get()
            ->map(function ($badge) {
                return [
                    'id' =>
                        $badge->id,

                    'slug' =>
                        $badge->slug,

                    'name' =>
                        $badge->name,

                    'description' =>
                        $badge->description,

                    'icon' =>
                        $badge->icon,

                    'color' =>
                        $badge->color,

                    'criteria' =>
                        $badge->unlock_text,

                    'starsReward' =>
                        (int)
                        $badge->stars_reward,

                    'unlocked' =>
                        $badge->earned_at !== null,

                    'earnedAt' =>
                        $badge->earned_at,
                ];
            })
            ->values()
            ->all();

        /*
        |--------------------------------------------------------------------------
        | Historial de evaluaciones
        |--------------------------------------------------------------------------
        */

        $assessmentHistory =
            AssessmentAttempt::query()
                ->with('assessment')
                ->where(
                    'user_id',
                    $user->id
                )
                ->where(
                    'status',
                    'completed'
                )
                ->get()
                ->map(function (
                    AssessmentAttempt $attempt
                ) {
                    return [
                        'id' =>
                            'assessment-' .
                            $attempt->id,

                        'type' =>
                            'assessment',

                        'title' =>
                            $attempt
                                ->assessment
                                ?->title
                            ?? 'Evaluación',

                        'score' =>
                            (int) round(
                                $attempt
                                    ->percentage
                            ),

                        'date' =>
                            optional(
                                $attempt
                                    ->submitted_at
                            )
                                ->toISOString(),

                        'icon' =>
                            'assignment',

                        'color' =>
                            'secondary',
                    ];
                });

        /*
        |--------------------------------------------------------------------------
        | Historial de cuentos
        |--------------------------------------------------------------------------
        */

        $storyHistory =
            StoryProgress::query()
                ->with('story')
                ->where(
                    'user_id',
                    $user->id
                )
                ->whereNotNull(
                    'completed_at'
                )
                ->get()
                ->map(function (
                    StoryProgress $progress
                ) {
                    return [
                        'id' =>
                            'story-' .
                            $progress->id,

                        'type' =>
                            'story',

                        'title' =>
                            $progress
                                ->story
                                ?->title
                            ?? 'Cuento completado',

                        /*
                         * Un cuento completado representa
                         * 100% de progreso.
                         */
                        'score' => 100,

                        'date' =>
                            optional(
                                $progress
                                    ->completed_at
                            )
                                ->toISOString(),

                        'icon' =>
                            'auto_stories',

                        'color' =>
                            'primary',
                    ];
                });

        /*
        |--------------------------------------------------------------------------
        | Historial combinado
        |--------------------------------------------------------------------------
        */

        $activityHistory =
            $assessmentHistory
                ->concat(
                    $storyHistory
                )
                ->sortByDesc('date')
                ->values();

        /*
        |--------------------------------------------------------------------------
        | Título del estudiante
        |--------------------------------------------------------------------------
        */

        $level =
            (int) (
                $profile?->level
                ?? 1
            );

        $rank = match (true) {
            $level >= 8 =>
                'Sabio de las Lenguas',

            $level >= 5 =>
                'Guardián del Conocimiento',

            $level >= 3 =>
                'Explorador de Raíces',

            default =>
                'Aprendiz de Raíces',
        };

        return Inertia::render(
            'Student/Achievements/Index',
            [
                'student' => [
                    'name' =>
                        $user->name,

                    'level' =>
                        $level,

                    'rank' =>
                        $rank,

                    'stars' =>
                        (int) (
                            $profile?->stars
                            ?? 0
                        ),

                    'dialect' =>
                        $profile
                            ?->selected_dialect
                        ?? 'Náhuatl',

                    'storiesCompleted' =>
                        $stats[
                            'storiesCompleted'
                        ],

                    'assessmentsCompleted' =>
                        $stats[
                            'assessmentsCompleted'
                        ],

                    'assessmentsPassed' =>
                        $stats[
                            'assessmentsPassed'
                        ],

                    'bestAssessmentScore' =>
                        $stats[
                            'bestAssessmentScore'
                        ],
                ],

                'badges' =>
                    $badges,

                'recentActivity' =>
                    $activityHistory
                        ->take(4)
                        ->values()
                        ->all(),

                'allActivity' =>
                    $activityHistory
                        ->all(),
            ]
        );
    }
}