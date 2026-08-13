<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('stories')) {
            Schema::create('stories', function (Blueprint $table) {
                $table->id();
                $table->string('slug')->index();
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('language')->default('Náhuatl');
                $table->string('category')->default('Mitos');
                $table->string('level')->default('Básico');
                $table->unsignedInteger('duration')->default(5);
                $table->string('cover_emoji')->nullable();
                $table->text('image_url')->nullable();
                $table->boolean('is_featured')->default(false);
                $table->boolean('published')->default(true);
                $table->timestamps();
            });

            return;
        }

        $hasSlug = Schema::hasColumn('stories', 'slug');
        $hasTitle = Schema::hasColumn('stories', 'title');
        $hasDescription = Schema::hasColumn('stories', 'description');
        $hasLanguage = Schema::hasColumn('stories', 'language');
        $hasCategory = Schema::hasColumn('stories', 'category');
        $hasLevel = Schema::hasColumn('stories', 'level');
        $hasDuration = Schema::hasColumn('stories', 'duration');
        $hasCoverEmoji = Schema::hasColumn('stories', 'cover_emoji');
        $hasImageUrl = Schema::hasColumn('stories', 'image_url');
        $hasFeatured = Schema::hasColumn('stories', 'is_featured');
        $hasPublished = Schema::hasColumn('stories', 'published');

        Schema::table('stories', function (Blueprint $table) use (
            $hasSlug,
            $hasTitle,
            $hasDescription,
            $hasLanguage,
            $hasCategory,
            $hasLevel,
            $hasDuration,
            $hasCoverEmoji,
            $hasImageUrl,
            $hasFeatured,
            $hasPublished
        ) {
            if (!$hasSlug) {
                $table->string('slug')->nullable()->index();
            }

            if (!$hasTitle) {
                $table->string('title')->nullable();
            }

            if (!$hasDescription) {
                $table->text('description')->nullable();
            }

            if (!$hasLanguage) {
                $table->string('language')->default('Náhuatl');
            }

            if (!$hasCategory) {
                $table->string('category')->default('Mitos');
            }

            if (!$hasLevel) {
                $table->string('level')->default('Básico');
            }

            if (!$hasDuration) {
                $table->unsignedInteger('duration')->default(5);
            }

            if (!$hasCoverEmoji) {
                $table->string('cover_emoji')->nullable();
            }

            if (!$hasImageUrl) {
                $table->text('image_url')->nullable();
            }

            if (!$hasFeatured) {
                $table->boolean('is_featured')->default(false);
            }

            if (!$hasPublished) {
                $table->boolean('published')->default(true);
            }
        });
    }

    public function down(): void
    {
        // No eliminamos stories porque puede ser una tabla
        // que ya existía previamente en el proyecto.
    }
};