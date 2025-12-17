<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('progress', function (Blueprint $table) {
            $table->id();
            // Relacionamos el progreso con un alumno específico
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Tipo de actividad: 'juego', 'video', 'cuento', 'ejercicio'
            $table->string('type');
            
            // El ID único que le dimos en el Frontend (ej. 'n1', 'o3', 'video-1')
            $table->string('item_id');
            
            // Puntos obtenidos (opcional, por si sacan 80/100 en un quiz)
            $table->integer('score')->default(0);
            
            // Si ya lo terminó por completo
            $table->boolean('completed')->default(false);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress');
    }
};