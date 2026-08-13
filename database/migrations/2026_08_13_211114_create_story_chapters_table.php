<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('story_chapters', function (Blueprint $table) {
            $table->id();

            $table->foreignId('story_id')
                ->constrained('stories')
                ->cascadeOnDelete();

            $table->unsignedInteger('chapter_number');

            $table->string('title');

            $table->text('spanish_text');

            // Traducción validada al idioma objetivo.
            $table->text('target_text')->nullable();

            // Vocabulario relacionado con el capítulo.
            $table->json('vocabulary')->nullable();

            // Para futuras imágenes subidas desde el CMS.
            $table->text('image_url')->nullable();

            // Para futuros MP3/WAV.
            $table->text('audio_url')->nullable();

            $table->timestamps();

            $table->unique([
                'story_id',
                'chapter_number',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('story_chapters');
    }
};