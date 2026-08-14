<?php

namespace App\Http\Controllers;

use App\Models\GameResult;
use App\Services\AchievementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class GameResultController extends Controller
{
    public function store(
        Request $request,
        AchievementService $achievementService
    ): JsonResponse {
        /*
        |--------------------------------------------------------------------------
        | Validar información enviada por el juego
        |--------------------------------------------------------------------------
        */

        $data =
            $request->validate([
                'result_uuid' => [
                    'required',
                    'uuid',
                ],

                'game_key' => [
                    'required',

                    Rule::in([
                        'memory',
                        'matching',
                        'wordsearch',
                        'puzzle',
                        'dictation',
                        'trivia',
                    ]),
                ],

                'score' => [
                    'required',
                    'integer',
                    'min:0',
                ],

                'lives_remaining' => [
                    'required',
                    'integer',
                    'min:0',
                    'max:8',
                ],

                'elapsed_seconds' => [
                    'required',
                    'integer',
                    'min:0',
                    'max:86400',
                ],

                'won' => [
                    'required',
                    'boolean',
                ],
            ]);

        /*
        |--------------------------------------------------------------------------
        | Configuración de cada juego
        |--------------------------------------------------------------------------
        */

        $gameConfig = [
            'memory' => [
                'maxLives' => 8,
                'targetSeconds' => 120,
            ],

            'matching' => [
                'maxLives' => 8,
                'targetSeconds' => 120,
            ],

            'wordsearch' => [
                'maxLives' => 8,
                'targetSeconds' => 180,
            ],

            'puzzle' => [
                'maxLives' => 8,
                'targetSeconds' => 180,
            ],

            'dictation' => [
                'maxLives' => 8,
                'targetSeconds' => 180,
            ],

            'trivia' => [
                'maxLives' => 8,
                'targetSeconds' => 180,
            ],
        ];

        $config =
            $gameConfig[
                $data['game_key']
            ];

        /*
        |--------------------------------------------------------------------------
        | Calcular estrellas
        |--------------------------------------------------------------------------
        |
        | 10 estrellas por ganar.
        | +5 por conservar todas las vidas.
        | +5 por hacerlo dentro del tiempo objetivo.
        |
        */

        $earnedStars = 0;

        if ($data['won']) {
            $earnedStars += 10;

            if (
                $data[
                    'lives_remaining'
                ] >=
                $config['maxLives']
            ) {
                $earnedStars += 5;
            }

            if (
                $data[
                    'elapsed_seconds'
                ] <=
                $config[
                    'targetSeconds'
                ]
            ) {
                $earnedStars += 5;
            }
        }

        $result = null;
        $created = false;

        /*
        |--------------------------------------------------------------------------
        | Guardar resultado
        |--------------------------------------------------------------------------
        */

        DB::transaction(
            function () use (
                $data,
                $config,
                $earnedStars,
                &$result,
                &$created
            ) {
                /*
                 * Si ya recibimos esta partida,
                 * no la registramos dos veces.
                 */
                $existing =
                    GameResult::query()
                        ->where(
                            'result_uuid',
                            $data[
                                'result_uuid'
                            ]
                        )
                        ->first();

                if ($existing) {
                    $result =
                        $existing;

                    return;
                }

                $result =
                    GameResult::create([
                        'result_uuid' =>
                            $data[
                                'result_uuid'
                            ],

                        'user_id' =>
                            auth()->id(),

                        'game_key' =>
                            $data[
                                'game_key'
                            ],

                        'score' =>
                            $data[
                                'score'
                            ],

                        'earned_stars' =>
                            $earnedStars,

                        'lives_remaining' =>
                            $data[
                                'lives_remaining'
                            ],

                        'max_lives' =>
                            $config[
                                'maxLives'
                            ],

                        'elapsed_seconds' =>
                            $data[
                                'elapsed_seconds'
                            ],

                        'won' =>
                            $data[
                                'won'
                            ],

                        'played_at' =>
                            now(),
                    ]);

                $created = true;

                /*
                 * Añadir estrellas de la partida
                 * al perfil del alumno.
                 */
                if (
                    $earnedStars > 0
                ) {
                    DB::table(
                        'student_profiles'
                    )
                        ->where(
                            'user_id',
                            auth()->id()
                        )
                        ->increment(
                            'stars',
                            $earnedStars
                        );
                }
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Revisar nuevas insignias
        |--------------------------------------------------------------------------
        */

        $achievementData =
            $achievementService
                ->sync(
                    auth()->user()
                );

        /*
        |--------------------------------------------------------------------------
        | Respuesta al juego
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'saved' => true,

            'created' =>
                $created,

            'result' => [
                'id' =>
                    $result->id,

                'score' =>
                    $result->score,

                'stars' =>
                    $result
                        ->earned_stars,

                'won' =>
                    $result->won,
            ],

            'newBadges' =>
                $achievementData[
                    'newBadges'
                ] ?? [],
        ]);
    }
}