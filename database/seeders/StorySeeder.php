<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Story;

class StorySeeder extends Seeder
{
    public function run(): void
    {
        // Intentamos limpiar la tabla
        try {
            Story::truncate();
        } catch (\Exception $e) {
            // Si falla, seguimos
        }

        // Cuento 1
        Story::create([
            'title' => 'El Conejo en la Luna (Tochtli)',
            'content' => 'Hace mucho tiempo, el dios Quetzalcóatl decidió viajar por el mundo en forma humana. Después de caminar todo el día, estaba cansado y hambriento. Un pequeño conejo le ofreció su propia vida para alimentarlo. Quetzalcóatl, conmovido, lo levantó tan alto que su figura quedó estampada en la luna para siempre.',
            'image_url' => 'https://via.placeholder.com/400x300/ffb6c1/333333?text=Conejo+Luna',
            'category' => 'Nahuatl'
        ]);

        // Cuento 2
        Story::create([
            'title' => 'La leyenda del Maíz',
            'content' => 'Los antiguos aztecas solo comían raíces y caza, pues el maíz estaba escondido tras las montañas. Quetzalcóatl se transformó en una hormiga negra y, acompañado de una hormiga roja, logró cruzar las montañas y traer un grano de maíz para sembrarlo.',
            'image_url' => 'https://via.placeholder.com/400x300/87ceeb/333333?text=Leyenda+Maiz',
            'category' => 'Nahuatl'
        ]);
    }
}