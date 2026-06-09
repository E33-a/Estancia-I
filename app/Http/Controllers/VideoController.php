<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        // 1. Pedimos todos los videos a la base de datos
        $videos = Video::all();

        // 2. Se los enviamos a la vista 'Videos/Index'
        return Inertia::render('Videos/Index', [
            'videos' => $videos
        ]);
    }
}