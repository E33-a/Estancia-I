<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function index(): Response
    {
        $games = [
            [
                'id' => 'memory',
                'title' => 'Memorama',
                'description' => '¡Encuentra los pares y aprende! Memoriza palabras y sus significados visuales.',
                'difficulty' => 'Fácil',
                'icon' => 'style',
                'iconColor' => 'primary',
                'iconBackground' => 'primary-fixed',
            ],
            [
                'id' => 'word-search',
                'title' => 'Sopa de Letras',
                'description' => 'Busca las palabras ocultas en la cuadrícula mágica. ¡Amplía tu vocabulario!',
                'difficulty' => 'Intermedio',
                'icon' => 'grid_on',
                'iconColor' => 'tertiary',
                'iconBackground' => 'tertiary-fixed',
            ],
            [
                'id' => 'matching',
                'title' => 'Relacionar',
                'description' => 'Conecta conceptos con su traducción correcta. Un puente entre culturas.',
                'difficulty' => 'Fácil',
                'icon' => 'sync_alt',
                'iconColor' => 'secondary',
                'iconBackground' => 'secondary-fixed',
            ],
            [
                'id' => 'puzzle',
                'title' => 'Rompecabezas',
                'description' => 'Arma fragmentos de historias tradicionales y descubre hermosas leyendas.',
                'difficulty' => 'Avanzado',
                'icon' => 'extension',
                'iconColor' => 'primary',
                'iconBackground' => 'primary-fixed',
            ],
            [
                'id' => 'dictation',
                'title' => 'Dictado',
                'description' => 'Escucha y escribe. Mejora tu ortografía en lenguas originarias de forma activa.',
                'difficulty' => 'Intermedio',
                'icon' => 'record_voice_over',
                'iconColor' => 'on-surface-variant',
                'iconBackground' => 'surface-container-high',
            ],
            [
                'id' => 'trivia',
                'title' => 'Trivia Cultural',
                'description' => '¿Cuánto sabes sobre México? Responde preguntas sobre geografía y tradiciones.',
                'difficulty' => 'Intermedio',
                'icon' => 'quiz',
                'iconColor' => 'secondary',
                'iconBackground' => 'secondary-fixed',
            ],
        ];

        return Inertia::render('Student/Games/Index', [
            'games' => $games,
        ]);
    }
}