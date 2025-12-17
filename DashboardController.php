<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Video;
use App\Models\Story;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. OBTENER DATOS DE LA BASE DE DATOS (ALEATORIOS)
        // Traemos videos y cuentos desordenados
        $videos = Video::inRandomOrder()->take(3)->get();
        $stories = Story::inRandomOrder()->take(3)->get();

        // 2. DATOS ESTÁTICOS (EJERCICIOS Y JUEGOS)
        // Como estos no están en base de datos aún, los definimos aquí y los mezclamos
        $exercises = [
            ['title' => 'Unir palabras', 'img' => '/images/unir.png', 'color' => 'bg-pink-100', 'border' => 'border-pink-200'],
            ['title' => 'Completar sílaba', 'img' => '/images/completa.png', 'color' => 'bg-blue-100', 'border' => 'border-blue-200'],
            ['title' => 'Quiz', 'img' => '/images/quiz.png', 'color' => 'bg-yellow-100', 'border' => 'border-yellow-200'],
            ['title' => 'Aprendiendo', 'img' => '/images/aprediendo.png', 'color' => 'bg-purple-100', 'border' => 'border-purple-200'],
            ['title' => 'Relación', 'img' => '/images/relacion.png', 'color' => 'bg-green-100', 'border' => 'border-green-200'],
            ['title' => 'ABC', 'img' => '/images/apredie.png', 'color' => 'bg-orange-100', 'border' => 'border-orange-200'],
            ['title' => 'Cuentos', 'img' => '/images/completaC.png', 'color' => 'bg-indigo-100', 'border' => 'border-indigo-200'],
            ['title' => 'Traducción', 'img' => '/images/traduccion.png', 'color' => 'bg-red-100', 'border' => 'border-red-200'],
            ['title' => 'Dictado', 'img' => '/images/dictado.png', 'color' => 'bg-teal-100', 'border' => 'border-teal-200'],
        ];
        shuffle($exercises); // ¡Barajamos los ejercicios!

        $games = [
             ['title' => 'Memorama', 'img' => '/images/memorama.png'],
             ['title' => 'Lotería', 'img' => '/images/loteria.png'],
             ['title' => 'Crucigrama', 'img' => '/images/crucigrama.png'],
             ['title' => 'Serpientes', 'img' => '/images/serpientes.png'],
             ['title' => 'Ahorcado', 'img' => '/images/ahorcado.png'], // Asegúrate de tener estas imágenes o repetirá el default
        ];
        shuffle($games); // ¡Barajamos los juegos!

        // 3. ENVIAR TODO A LA VISTA
        return Inertia::render('Dashboard', [
            'randomVideos' => $videos,
            'randomStories' => $stories,
            'randomExercises' => $exercises,
            'randomGames' => $games,
        ]);
    }
}