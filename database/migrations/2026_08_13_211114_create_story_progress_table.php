<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('story_progresses', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('story_id')
                ->constrained('stories')
                ->cascadeOnDelete();

            $table->unsignedInteger('last_chapter_number')
                ->default(1);

            $table->timestamp('completed_at')
                ->nullable();

            $table->timestamps();

            $table->unique([
                'user_id',
                'story_id',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('story_progresses');
    }
};