<?php

namespace App\Http\Controllers;

use App\Models\VocabularyItem;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Obtener vocabulario aleatorio
    |--------------------------------------------------------------------------
    |
    | Intenta evitar que una nueva partida reciba exactamente las mismas
    | palabras que la partida anterior del mismo juego.
    |
    */

    private function randomVocabulary(
        int $limit = 8,
        string $game = 'general'
    ): Collection {
        $baseQuery = VocabularyItem::query()
            ->where('active', true)
            ->where('language', 'Náhuatl');

        $total = (clone $baseQuery)->count();

        if ($total === 0) {
            return collect();
        }

        $sessionKey = "game_vocab_{$game}";

        $previousIds = session($sessionKey, []);

        $query = clone $baseQuery;

        // Si hay suficientes palabras, evitar las de la partida anterior.
        if (
            !empty($previousIds) &&
            $total >= ($limit * 2)
        ) {
            $query->whereNotIn('id', $previousIds);
        }

        $items = $query
            ->inRandomOrder()
            ->limit(min($limit, $total))
            ->get();

        // Completar si por alguna razón faltan elementos.
        if ($items->count() < min($limit, $total)) {
            $missing = min($limit, $total) - $items->count();

            $extra = (clone $baseQuery)
                ->whereNotIn('id', $items->pluck('id'))
                ->inRandomOrder()
                ->limit($missing)
                ->get();

            $items = $items->concat($extra);
        }

        session([
            $sessionKey => $items->pluck('id')->values()->all(),
        ]);

        return $items->values();
    }

    /*
    |--------------------------------------------------------------------------
    | Convertir vocabulario al formato que usan los juegos React
    |--------------------------------------------------------------------------
    */

    private function formatVocabulary(Collection $items): array
    {
        return $items
            ->map(function (VocabularyItem $item) {
                return [
                    'id' => $item->id,

                    'spanish' => $item->spanish,

                    // Conservamos "nahuatl" para no tener que reescribir
                    // Memory.jsx, Matching.jsx y Dictation.jsx.
                    'nahuatl' => $item->target,

                    'language' => $item->language,
                    'variant' => $item->variant,
                    'category' => $item->category,
                    'emoji' => $item->emoji,
                    'difficulty' => $item->difficulty,

                    'audioUrl' => $item->audio_path
                        ? asset('storage/' . $item->audio_path)
                        : null,
                ];
            })
            ->values()
            ->all();
    }

    /*
    |--------------------------------------------------------------------------
    | Catálogo
    |--------------------------------------------------------------------------
    */

    public function index(): Response
    {
        $games = [
            [
                'id' => 'memory',
                'title' => 'Memorama',
                'description' =>
                    'Relaciona palabras, significados e imágenes en la lengua que estás aprendiendo.',
                'difficulty' => 'Fácil',
                'icon' => 'style',
                'iconColor' => 'primary',
                'iconBackground' => 'primary-fixed',
                'route' => 'games.memory',
            ],
            [
                'id' => 'word-search',
                'title' => 'Sopa de Letras',
                'description' =>
                    'Encuentra vocabulario en Náhuatl entre las letras de la cuadrícula.',
                'difficulty' => 'Intermedio',
                'icon' => 'grid_on',
                'iconColor' => 'tertiary',
                'iconBackground' => 'tertiary-fixed',
                'route' => 'games.wordsearch',
            ],
            [
                'id' => 'matching',
                'title' => 'Relacionar',
                'description' =>
                    'Relaciona cada palabra en español con su equivalente en Náhuatl.',
                'difficulty' => 'Fácil',
                'icon' => 'sync_alt',
                'iconColor' => 'secondary',
                'iconBackground' => 'secondary-fixed',
                'route' => 'games.matching',
            ],
            [
                'id' => 'puzzle',
                'title' => 'Rompecabezas',
                'description' =>
                    'Ordena fragmentos para construir correctamente palabras en Náhuatl.',
                'difficulty' => 'Intermedio',
                'icon' => 'extension',
                'iconColor' => 'primary',
                'iconBackground' => 'primary-fixed',
                'route' => 'games.puzzle',
            ],
            [
                'id' => 'dictation',
                'title' => 'Dictado',
                'description' =>
                    'Escucha vocabulario en Náhuatl y escribe correctamente la palabra.',
                'difficulty' => 'Intermedio',
                'icon' => 'record_voice_over',
                'iconColor' => 'on-surface-variant',
                'iconBackground' => 'surface-container-high',
                'route' => 'games.dictation',
            ],
            [
                'id' => 'trivia',
                'title' => 'Trivia Cultural',
                'description' =>
                    'Responde preguntas aleatorias sobre el vocabulario que has aprendido.',
                'difficulty' => 'Intermedio',
                'icon' => 'quiz',
                'iconColor' => 'secondary',
                'iconBackground' => 'secondary-fixed',
                'route' => 'games.trivia',
            ],
        ];

        return Inertia::render('Student/Games/Index', [
            'games' => $games,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Memorama
    |--------------------------------------------------------------------------
    */

    public function memory(): Response
    {
        $items = $this->randomVocabulary(
            8,
            'memory'
        );

        return Inertia::render(
            'Student/Games/Memory',
            [
                'pairs' =>
                    $this->formatVocabulary($items),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Relacionar
    |--------------------------------------------------------------------------
    */

    public function matching(): Response
    {
        $items = $this->randomVocabulary(
            8,
            'matching'
        );

        return Inertia::render(
            'Student/Games/Matching',
            [
                'pairs' =>
                    $this->formatVocabulary($items),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Sopa de letras
    |--------------------------------------------------------------------------
    */

    public function wordSearch(): Response
    {
        $items = $this->randomVocabulary(
            8,
            'wordsearch'
        );

        $words = $items
            ->map(function (VocabularyItem $item) {
                return [
                    'id' => $item->id,

                    'word' => mb_strtoupper(
                        $item->target,
                        'UTF-8'
                    ),

                    'meaning' => $item->spanish,
                    'category' => $item->category,
                ];
            })
            ->values()
            ->all();

        return Inertia::render(
            'Student/Games/WordSearch',
            [
                'words' => $words,
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Rompecabezas
    |--------------------------------------------------------------------------
    */

    public function puzzle(): Response
    {
        $items = VocabularyItem::query()
            ->where('active', true)
            ->where('language', 'Náhuatl')
            ->whereNotNull('puzzle_parts')
            ->inRandomOrder()
            ->limit(6)
            ->get();

        $puzzles = $items
            ->map(function (VocabularyItem $item) {
                return [
                    'id' => $item->id,

                    'title' =>
                        'Forma la palabra en Náhuatl',

                    'emoji' => $item->emoji,

                    // La pista sí puede estar en español.
                    'clue' => $item->spanish,

                    // La respuesta NO está en español.
                    'answer' => $item->target,

                    // Lo que el alumno debe ordenar.
                    'pieces' =>
                        $item->puzzle_parts,
                ];
            })
            ->values()
            ->all();

        return Inertia::render(
            'Student/Games/Puzzle',
            [
                'puzzles' => $puzzles,
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Dictado
    |--------------------------------------------------------------------------
    */

    public function dictation(): Response
    {
        $items = $this->randomVocabulary(
            8,
            'dictation'
        );

        return Inertia::render(
            'Student/Games/Dictation',
            [
                'words' =>
                    $this->formatVocabulary($items),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Trivia generada automáticamente
    |--------------------------------------------------------------------------
    */

    public function trivia(): Response
    {
        $pool = VocabularyItem::query()
            ->where('active', true)
            ->where('language', 'Náhuatl')
            ->inRandomOrder()
            ->limit(16)
            ->get();

        $questionItems = $pool
            ->take(8);

        $questions = $questionItems
            ->map(function (
                VocabularyItem $item
            ) use ($pool) {

                /*
                 * Alternamos entre:
                 *
                 * Náhuatl -> Español
                 * Español -> Náhuatl
                 */

                $targetToSpanish =
                    random_int(0, 1) === 1;

                if ($targetToSpanish) {

                    $wrongOptions = $pool
                        ->where(
                            'id',
                            '!=',
                            $item->id
                        )
                        ->pluck('spanish')
                        ->unique()
                        ->shuffle()
                        ->take(3);

                    $options = $wrongOptions
                        ->push($item->spanish)
                        ->shuffle()
                        ->values()
                        ->all();

                    return [
                        'id' =>
                            'meaning-' . $item->id,

                        'question' =>
                            '¿Qué significa "' .
                            $item->target .
                            '"?',

                        'options' => $options,

                        'answer' =>
                            $item->spanish,

                        'explanation' =>
                            $item->target .
                            ' corresponde a ' .
                            $item->spanish .
                            '.',
                    ];
                }

                $wrongOptions = $pool
                    ->where(
                        'id',
                        '!=',
                        $item->id
                    )
                    ->pluck('target')
                    ->unique()
                    ->shuffle()
                    ->take(3);

                $options = $wrongOptions
                    ->push($item->target)
                    ->shuffle()
                    ->values()
                    ->all();

                return [
                    'id' =>
                        'translation-' . $item->id,

                    'question' =>
                        '¿Cómo se dice "' .
                        $item->spanish .
                        '" en Náhuatl?',

                    'options' => $options,

                    'answer' =>
                        $item->target,

                    'explanation' =>
                        $item->spanish .
                        ' se relaciona con ' .
                        $item->target .
                        '.',
                ];
            })
            ->values()
            ->all();

        return Inertia::render(
            'Student/Games/Trivia',
            [
                'questions' => $questions,
            ]
        );
    }
}