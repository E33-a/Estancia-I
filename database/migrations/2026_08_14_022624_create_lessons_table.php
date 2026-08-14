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
    Schema::create('lessons', function (Blueprint $table) {
        $table->id();

        $table->string('title');
        $table->string('slug')->unique();

        $table->text('description')->nullable();

        $table->string('category')->nullable();
        $table->string('level')->default('Básico');
        $table->string('language')->default('Náhuatl');

        $table->unsignedInteger('stars_reward')->default(10);

        $table->unsignedInteger('sort_order')->default(0);

        $table->boolean('active')->default(true);

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
