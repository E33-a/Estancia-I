<?php

namespace Database\Seeders;

use App\Models\VocabularyItem;
use Illuminate\Database\Seeder;

class VocabularyItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [

            /*
            |--------------------------------------------------------------------------
            | Animales
            |--------------------------------------------------------------------------
            */

            [
                'spanish' => 'Conejo',
                'target' => 'Tochtli',
                'emoji' => '🐇',
                'category' => 'animales',
                'puzzle_parts' => ['Toch', 'tli'],
                'source_reference' => 'Contenido inicial del proyecto',
            ],
            [
                'spanish' => 'Jaguar',
                'target' => 'Ocelotl',
                'emoji' => '🐆',
                'category' => 'animales',
                'puzzle_parts' => ['Oce', 'lotl'],
                'source_reference' => 'Contenido inicial del proyecto',
            ],
            [
                'spanish' => 'Águila',
                'target' => 'Cuauhtli',
                'emoji' => '🦅',
                'category' => 'animales',
                'puzzle_parts' => ['Cuauh', 'tli'],
                'source_reference' => 'Contenido inicial del proyecto',
            ],
            [
                'spanish' => 'Perro',
                'target' => 'Itzcuintli',
                'emoji' => '🐕',
                'category' => 'animales',
                'puzzle_parts' => ['Itz', 'cuin', 'tli'],
                'source_reference' => 'Contenido inicial del proyecto',
            ],
            [
                'spanish' => 'Venado',
                'target' => 'Mazatl',
                'emoji' => '🦌',
                'category' => 'animales',
                'puzzle_parts' => ['Ma', 'zatl'],
                'source_reference' => 'Contenido inicial del proyecto',
            ],
            [
                'spanish' => 'Serpiente',
                'target' => 'Coatl',
                'emoji' => '🐍',
                'category' => 'animales',
                'puzzle_parts' => ['Co', 'atl'],
                'source_reference' => 'Contenido inicial del proyecto',
            ],
            [
                'spanish' => 'Mariposa',
                'target' => 'Papalotl',
                'emoji' => '🦋',
                'category' => 'animales',
                'puzzle_parts' => ['Pa', 'pa', 'lotl'],
                'source_reference' => 'Contenido inicial del proyecto',
            ],
            [
                'spanish' => 'Pájaro',
                'target' => 'Tototl',
                'emoji' => '🐦',
                'category' => 'animales',
                'puzzle_parts' => ['To', 'totl'],
                'source_reference' => 'Contenido inicial del proyecto',
            ],

            /*
            |--------------------------------------------------------------------------
            | Naturaleza
            |--------------------------------------------------------------------------
            */

            [
                'spanish' => 'Agua',
                'target' => 'Atl',
                'emoji' => '💧',
                'category' => 'naturaleza',
                'puzzle_parts' => ['A', 'tl'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],
            [
                'spanish' => 'Tierra',
                'target' => 'Tlalli',
                'emoji' => '🌎',
                'category' => 'naturaleza',
                'puzzle_parts' => ['Tla', 'lli'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],
            [
                'spanish' => 'Flor',
                'target' => 'Xochitl',
                'emoji' => '🌸',
                'category' => 'naturaleza',
                'puzzle_parts' => ['Xo', 'chitl'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],
            [
                'spanish' => 'Luna',
                'target' => 'Metztli',
                'emoji' => '🌙',
                'category' => 'naturaleza',
                'puzzle_parts' => ['Metz', 'tli'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],
            [
                'spanish' => 'Fuego',
                'target' => 'Tletl',
                'emoji' => '🔥',
                'category' => 'naturaleza',
                'puzzle_parts' => ['Tle', 'tl'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],
            [
                'spanish' => 'Sol',
                'target' => 'Tonatiuh',
                'emoji' => '☀️',
                'category' => 'naturaleza',
                'puzzle_parts' => ['To', 'na', 'tiuh'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],
            [
                'spanish' => 'Cerro',
                'target' => 'Tepetl',
                'emoji' => '⛰️',
                'category' => 'naturaleza',
                'puzzle_parts' => ['Te', 'petl'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],
            [
                'spanish' => 'Árbol',
                'target' => 'Cuahuitl',
                'emoji' => '🌳',
                'category' => 'naturaleza',
                'puzzle_parts' => ['Cuah', 'uitl'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],

            /*
            |--------------------------------------------------------------------------
            | Vida diaria
            |--------------------------------------------------------------------------
            */

            [
                'spanish' => 'Casa',
                'target' => 'Calli',
                'emoji' => '🏠',
                'category' => 'vida_diaria',
                'puzzle_parts' => ['Ca', 'lli'],
                'source_reference' => 'Gran Diccionario Náhuatl - UNAM',
            ],
        ];

        foreach ($items as $item) {
            VocabularyItem::updateOrCreate(
                [
                    'language' => 'Náhuatl',
                    'spanish' => $item['spanish'],
                    'target' => $item['target'],
                ],
                [
                    ...$item,
                    'language' => 'Náhuatl',
                    'variant' => null,
                    'difficulty' => 'basic',
                    'active' => true,
                ]
            );
        }
    }
}