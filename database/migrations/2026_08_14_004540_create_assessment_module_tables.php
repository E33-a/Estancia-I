<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Evaluaciones
        |--------------------------------------------------------------------------
        */

        Schema::create('assessments', function (Blueprint $table) {
            $table->id();

            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();

            $table->string('language')->default('Náhuatl');
            $table->string('category')->default('Vocabulario');

            $table->unsignedInteger('passing_score')->default(70);
            $table->unsignedInteger('question_limit')->default(10);
            $table->unsignedInteger('time_limit_minutes')->default(15);
            $table->unsignedInteger('max_attempts')->default(3);

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // Permite evaluaciones generales.
            // Posteriormente el docente podrá ponerlo en false
            // y asignar alumnos específicos.
            $table->boolean('available_to_all_students')
                ->default(false);

            $table->boolean('active')->default(true);

            $table->timestamps();
        });

        /*
        |--------------------------------------------------------------------------
        | Preguntas
        |--------------------------------------------------------------------------
        */

        Schema::create('assessment_questions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('assessment_id')
                ->constrained()
                ->cascadeOnDelete();

            /*
             * Tipos:
             * multiple_choice
             * image_choice
             * fill_blank
             * audio_choice
             */
            $table->string('type');

            $table->text('prompt');

            $table->text('instructions')->nullable();

            // Palabra que debe reproducirse.
            $table->string('audio_text')->nullable();

            // Para MP3/WAV reales en el futuro.
            $table->string('audio_path')->nullable();

            // Imagen general de la pregunta.
            $table->string('image_url')->nullable();

            // Opciones en JSON.
            $table->json('options')->nullable();

            // Nunca se envía al frontend durante el examen.
            $table->string('correct_answer');

            $table->text('explanation')->nullable();

            $table->unsignedInteger('points')->default(10);
            $table->unsignedInteger('position')->default(1);

            $table->boolean('active')->default(true);

            $table->timestamps();
        });

        /*
        |--------------------------------------------------------------------------
        | Intentos
        |--------------------------------------------------------------------------
        */

        Schema::create('assessment_attempts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('assessment_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('status')->default('in_progress');

            // Guarda exactamente qué preguntas recibió el alumno.
            $table->json('question_ids');

            $table->unsignedInteger('score')->default(0);
            $table->unsignedInteger('max_score')->default(0);

            $table->decimal('percentage', 5, 2)->default(0);

            $table->unsignedInteger('correct_count')->default(0);
            $table->unsignedInteger('total_questions')->default(0);

            $table->unsignedInteger('elapsed_seconds')->default(0);

            $table->timestamp('started_at')->nullable();
            $table->timestamp('submitted_at')->nullable();

            $table->timestamps();
        });

        /*
        |--------------------------------------------------------------------------
        | Respuestas
        |--------------------------------------------------------------------------
        */

        Schema::create('assessment_answers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('attempt_id')
                ->constrained('assessment_attempts')
                ->cascadeOnDelete();

            $table->foreignId('question_id')
                ->constrained('assessment_questions')
                ->cascadeOnDelete();

            $table->text('answer')->nullable();

            $table->boolean('is_correct')->default(false);

            $table->unsignedInteger('points_earned')->default(0);

            $table->timestamps();

            $table->unique([
                'attempt_id',
                'question_id',
            ]);
        });

        /*
        |--------------------------------------------------------------------------
        | Asignaciones
        |--------------------------------------------------------------------------
        */

        Schema::create('assessment_assignments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('assessment_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('student_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('assigned_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('due_at')->nullable();

            $table->timestamps();

            $table->unique([
                'assessment_id',
                'student_id',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_assignments');
        Schema::dropIfExists('assessment_answers');
        Schema::dropIfExists('assessment_attempts');
        Schema::dropIfExists('assessment_questions');
        Schema::dropIfExists('assessments');
    }
};