<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\User;
use App\Models\Variant;
use App\Models\Word;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        // Autor por defecto para las palabras (docente si existe, si no null)
        $authorId = User::where('role', User::ROLE_TEACHER)->value('id');

        $languages = [
            'Náhuatl' => [
                'Náhuatl de la Huasteca' => [
                    ['term' => 'Tochtli', 'translation' => 'Conejo'],
                    ['term' => 'Metztli', 'translation' => 'Luna'],
                    ['term' => 'Atl', 'translation' => 'Agua'],
                    ['term' => 'Cuahuitl', 'translation' => 'Árbol'],
                    ['term' => 'Tonatiuh', 'translation' => 'Sol'],
                ],
                'Náhuatl de la Sierra' => [
                    ['term' => 'Itzcuintli', 'translation' => 'Perro'],
                    ['term' => 'Xochitl', 'translation' => 'Flor'],
                    ['term' => 'Tlalli', 'translation' => 'Tierra'],
                ],
            ],
            'Otomí' => [
                'Otomí del Valle del Mezquital' => [
                    ['term' => 'Ndö', 'translation' => 'Casa'],
                    ['term' => 'Dehe', 'translation' => 'Agua'],
                    ['term' => 'Hyadi', 'translation' => 'Sol'],
                    ['term' => 'Zi ndä', 'translation' => 'Perro pequeño'],
                ],
            ],
            'Maya' => [
                'Maya Yucateco' => [
                    ['term' => 'Peek', 'translation' => 'Perro'],
                    ['term' => 'Kʼáax', 'translation' => 'Monte / Bosque'],
                    ['term' => 'Chan', 'translation' => 'Pequeño'],
                    ['term' => 'Kʼiin', 'translation' => 'Sol / Día'],
                ],
            ],
        ];

        foreach ($languages as $languageName => $variants) {
            $language = Language::updateOrCreate(
                ['name' => $languageName],
                ['is_active' => true]
            );

            foreach ($variants as $variantName => $words) {
                $variant = Variant::updateOrCreate(
                    ['language_id' => $language->id, 'name' => $variantName],
                    ['status' => 'active']
                );

                foreach ($words as $wordData) {
                    Word::updateOrCreate(
                        [
                            'variant_id' => $variant->id,
                            'term' => $wordData['term'],
                        ],
                        [
                            'user_id' => $authorId,
                            'translation' => $wordData['translation'],
                            'audio_path' => null,
                            'audio_duration' => null,
                            'audio_status' => 'missing',
                        ]
                    );
                }
            }
        }
    }
}
