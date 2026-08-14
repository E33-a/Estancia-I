<?php

namespace App\Services;

use App\Models\AssessmentAttempt;
use App\Models\GameResult;
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
        | Evaluaciones terminadas
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
                    if (!$attempt->assessment) {
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
        | Juegos
        |--------------------------------------------------------------------------
        */

        $gameResults =
            GameResult::query()
                ->where(
                    'user_id',
                    $user->id
                )
                ->get();

        $wonGames =
            $gameResults
                ->where(
                    'won',
                    true
                );

        // Total de partidas ganadas.
        $gamesWon =
            $wonGames->count();

        // Número de juegos distintos que ya completó.
        // memory, matching, wordsearch, puzzle, dictation y trivia.
        $uniqueGamesCompleted =
            $wonGames
                ->pluck('game_key')
                ->unique()
                ->count();

        // Partidas completadas conservando todas las vidas.
        $perfectGames =
            $wonGames
                ->filter(
                    function ($result) {
                        return
                            $result->lives_remaining >=
                            $result->max_lives;
                    }
                )
                ->count();

        // Número de victorias específicas en Memorama.
        $memoryWins =
            $wonGames
                ->where(
                    'game_key',
                    'memory'
                )
                ->count();

        // Estrellas ganadas jugando.
        $totalGameStars =
            (int)
            $gameResults
                ->sum(
                    'earned_stars'
                );

        /*
        |--------------------------------------------------------------------------
        | Insignias disponibles
        |--------------------------------------------------------------------------
        */

        $badges =
            DB::table('badges')
                ->where(
                    'active',
                    true
                )
                ->whereNotNull(
                    'slug'
                )
                ->get();

        $newBadges = [];

        foreach ($badges as $badge) {
            /*
            |--------------------------------------------------------------------------
            | Calcular avance de cada tipo de insignia
            |--------------------------------------------------------------------------
            */

            $currentValue =
                match (
                    $badge->unlock_type
                ) {
                    'stories_completed' =>
                        $storiesCompleted,

                    'assessments_passed' =>
                        $assessmentsPassed,

                    'best_assessment_score' =>
                        $bestAssessmentScore,

                    'games_won' =>
                        $gamesWon,

                    'unique_games_completed' =>
                        $uniqueGamesCompleted,

                    'perfect_games' =>
                        $perfectGames,

                    'memory_wins' =>
                        $memoryWins,

                    'total_game_stars' =>
                        $totalGameStars,

                    default => 0,
                };

            $shouldUnlock =
                $currentValue >=
                (int)
                $badge->unlock_value;

            if (!$shouldUnlock) {
                continue;
            }

            /*
            |--------------------------------------------------------------------------
            | Comprobar si ya la tenía
            |--------------------------------------------------------------------------
            */

            $alreadyUnlocked =
                DB::table(
                    'user_badges'
                )
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

            DB::table(
                'user_badges'
            )
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
            | Estrellas extra por desbloquear la insignia
            |--------------------------------------------------------------------------
            */

            if (
                (int)
                $badge->stars_reward > 0
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

            /*
            |--------------------------------------------------------------------------
            | Se devuelve al frontend para mostrarla en el modal
            |--------------------------------------------------------------------------
            */

            $newBadges[] = [
                'id' =>
                    $badge->id,

                'name' =>
                    $badge->name,

                'icon' =>
                    $badge->icon,

                'starsReward' =>
                    (int)
                    $badge->stars_reward,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Sincronizar cuentos leídos
        |--------------------------------------------------------------------------
        */

        DB::table(
            'student_profiles'
        )
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

        /*
        |--------------------------------------------------------------------------
        | Estadísticas generales
        |--------------------------------------------------------------------------
        */

        return [
            'storiesCompleted' =>
                $storiesCompleted,

            'assessmentsCompleted' =>
                $assessmentAttempts
                    ->count(),

            'assessmentsPassed' =>
                $assessmentsPassed,

            'bestAssessmentScore' =>
                round(
                    $bestAssessmentScore,
                    2
                ),

            'gamesPlayed' =>
                $gameResults->count(),

            'gamesWon' =>
                $gamesWon,

            'uniqueGamesCompleted' =>
                $uniqueGamesCompleted,

            'perfectGames' =>
                $perfectGames,

            'memoryWins' =>
                $memoryWins,

            'totalGameStars' =>
                $totalGameStars,

            'newBadges' =>
                $newBadges,
        ];
    }
}