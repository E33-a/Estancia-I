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
    Schema::create('lesson_vocabulary_item', function (Blueprint $table) {
        $table->id();

        $table->foreignId('lesson_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->foreignId('vocabulary_item_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->unsignedInteger('position')->default(0);

        $table->timestamps();

        $table->unique([
            'lesson_id',
            'vocabulary_item_id'
        ]);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lesson_vocabulary_item');
    }
};
