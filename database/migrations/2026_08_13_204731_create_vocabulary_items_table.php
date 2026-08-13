<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vocabulary_items', function (Blueprint $table) {
            $table->id();

            // Idioma que se está aprendiendo
            $table->string('language')->default('Náhuatl');

            // Variante regional/dialectal, si aplica
            $table->string('variant')->nullable();

            // animales, naturaleza, hogar, etc.
            $table->string('category')->default('general');

            // Traducción al español
            $table->string('spanish');

            // Palabra en la lengua objetivo
            $table->string('target');

            // Apoyo visual
            $table->string('emoji')->nullable();

            // Para imágenes futuras
            $table->string('image_path')->nullable();

            // MP3/WAV de pronunciación real
            $table->string('audio_path')->nullable();

            // Fragmentos usados por el rompecabezas
            $table->json('puzzle_parts')->nullable();

            $table->string('difficulty')->default('basic');

            // Referencia lingüística o nota
            $table->string('source_reference')->nullable();

            $table->boolean('active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vocabulary_items');
    }
};