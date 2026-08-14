<?php

namespace App\Services;

use App\Models\AssessmentAttempt;
use App\Models\StoryProgress;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AchievementService
{
    public function sync(User $user): array
    {
        /*
        |--------------------------------------------------------------------------
        | Cuentos terminados
        |--------------------------------------------------------------------------
        */

        $storiesCompleted =
            StoryProgress::query()
                ->where(
                    'user_id',
                    $user->id
                )
                ->whereNotNull(
                    'completed_at'
                )
                ->count();

        /*
        |--------------------------------------------------------------------------
        | Evaluaciones
        |--------------------------------------------------------------------------
        */

        $assessmentAttempts =
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
                ->get();

        $passedAttempts =
            $assessmentAttempts
                ->filter(function (
                    AssessmentAttempt $attempt
                ) {
                    if (
                        !$attempt->assessment
                    ) {
                        return false;
                    }

                    return
                        $attempt->percentage >=
                        $attempt
                            ->assessment
                            ->passing_score;
                });

        $assessmentsPassed =
            $passedAttempts->count();

        $bestAssessmentScore =
            (float) (
                $assessmentAttempts
                    ->max('percentage')
                ?? 0
            );

        /*
        |--------------------------------------------------------------------------
        | Insignias disponibles
        |--------------------------------------------------------------------------
        */

        $badges = DB::table('badges')
            ->where(
                'active',
                true
            )
            ->whereNotNull('slug')
            ->get();

        $newBadges = [];

        foreach ($badges as $badge) {
            $currentValue = match (
                $badge->unlock_type
            ) {
                'stories_completed' =>
                    $storiesCompleted,

                'assessments_passed' =>
                    $assessmentsPassed,

                'best_assessment_score' =>
                    $bestAssessmentScore,

                default => 0,
            };

            $shouldUnlock =
                $currentValue >=
                (int) $badge->unlock_value;

            if (!$shouldUnlock) {
                continue;
            }

            $alreadyUnlocked =
                DB::table('user_badges')
                    ->where(
                        'user_id',
                        $user->id
                    )
                    ->where(
                        'badge_id',
                        $badge->id
                    )
                    ->exists();

            if ($alreadyUnlocked) {
                continue;
            }

            /*
            |--------------------------------------------------------------------------
            | Otorgar insignia
            |--------------------------------------------------------------------------
            */

            DB::table('user_badges')
                ->insert([
                    'user_id' =>
                        $user->id,

                    'badge_id' =>
                        $badge->id,

                    'earned_at' =>
                        now(),

                    'created_at' =>
                        now(),

                    'updated_at' =>
                        now(),
                ]);

            /*
            |--------------------------------------------------------------------------
            | Recompensa de estrellas
            |--------------------------------------------------------------------------
            */

            if (
                (int) $badge->stars_reward >
                0
            ) {
                DB::table(
                    'student_profiles'
                )
                    ->where(
                        'user_id',
                        $user->id
                    )
                    ->increment(
                        'stars',
                        (int)
                        $badge->stars_reward
                    );
            }

            $newBadges[] = [
                'id' => $badge->id,
                'name' => $badge->name,
                'icon' => $badge->icon,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Sincronizar número de cuentos
        |--------------------------------------------------------------------------
        */

        DB::table('student_profiles')
            ->where(
                'user_id',
                $user->id
            )
            ->update([
                'stories_read' =>
                    $storiesCompleted,

                'updated_at' =>
                    now(),
            ]);

        return [
            'storiesCompleted' =>
                $storiesCompleted,

            'assessmentsCompleted' =>
                $assessmentAttempts->count(),

            'assessmentsPassed' =>
                $assessmentsPassed,

            'bestAssessmentScore' =>
                round(
                    $bestAssessmentScore,
                    2
                ),

            'newBadges' =>
                $newBadges,
        ];
    }
}