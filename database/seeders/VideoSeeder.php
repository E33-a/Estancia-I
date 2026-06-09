<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    public function run(): void
    {
        // Limpiamos la tabla para evitar duplicados
        try {
            Video::truncate();
        } catch (\Exception $e) {
            // Si falla al limpiar, continuamos
        }

        $videos = [
            // --- NÁHUATL ---
            [
                'title' => 'Números en Náhuatl (1 al 10)',
                'video_url' => 'https://www.youtube.com/embed/44a7sDAT98s',
                'thumbnail_url' => 'https://img.youtube.com/vi/44a7sDAT98s/hqdefault.jpg',
                'category' => 'Nahuatl'
            ],
            [
                'title' => 'Poema "Nonantsin" (Madre mía)',
                'video_url' => 'https://www.youtube.com/embed/-jcRzSUV4TU',
                'thumbnail_url' => 'https://img.youtube.com/vi/-jcRzSUV4TU/hqdefault.jpg',
                'category' => 'Nahuatl'
            ],
            [
                'title' => 'Los Colores en Náhuatl',
                'video_url' => 'https://www.youtube.com/embed/EPdG0XNz1mg',
                'thumbnail_url' => 'https://img.youtube.com/vi/EPdG0XNz1mg/hqdefault.jpg',
                'category' => 'Nahuatl'
            ],

            // --- OTOMÍ ---
            [
                'title' => 'Saludos y Despedidas en Otomí',
                'video_url' => 'https://www.youtube.com/embed/EOHh1wHh4Rg',
                'thumbnail_url' => 'https://img.youtube.com/vi/EOHh1wHh4Rg/hqdefault.jpg',
                'category' => 'Otomi'
            ],
            [
                'title' => 'Alfabeto en Otomí Hñahñu',
                'video_url' => 'https://www.youtube.com/embed/uQ2eOa4_61Q',
                'thumbnail_url' => 'https://img.youtube.com/vi/uQ2eOa4_61Q/hqdefault.jpg',
                'category' => 'Otomi'
            ],
            [
                'title' => 'Consonantes en Hñähñu',
                'video_url' => 'https://www.youtube.com/embed/FHfRl399WL4',
                'thumbnail_url' => 'https://img.youtube.com/vi/FHfRl399WL4/hqdefault.jpg',
                'category' => 'Otomi'
            ],
            [
                'title' => 'Canción Solecito en Ñathjo (Otomí)',
                'video_url' => 'https://www.youtube.com/embed/hLdZbHKo-vU',
                'thumbnail_url' => 'https://img.youtube.com/vi/hLdZbHKo-vU/hqdefault.jpg',
                'category' => 'Otomi'
            ]
        ];

        foreach ($videos as $video) {
            Video::create($video);
        }
    }
}