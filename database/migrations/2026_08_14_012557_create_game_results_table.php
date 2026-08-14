<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_results', function (Blueprint $table) {
            $table->id();

            // Evita guardar dos veces una misma partida
            // si el navegador repite la petición.
            $table->uuid('result_uuid')->unique();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('game_key');

            $table->unsignedInteger('score')->default(0);

            $table->unsignedInteger('earned_stars')->default(0);

            $table->unsignedInteger('lives_remaining')->default(0);

            $table->unsignedInteger('max_lives')->default(8);

            $table->unsignedInteger('elapsed_seconds')->default(0);

            $table->boolean('won')->default(false);

            $table->json('metadata')->nullable();

            $table->timestamp('played_at')->nullable();

            $table->timestamps();

            $table->index([
                'user_id',
                'game_key',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_results');
    }
};