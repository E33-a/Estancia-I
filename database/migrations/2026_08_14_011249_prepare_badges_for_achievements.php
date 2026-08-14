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
        | BADGES
        |--------------------------------------------------------------------------
        |
        | El proyecto ya tenía esta tabla, por eso comprobamos columna por
        | columna para no destruir ni duplicar su estructura anterior.
        |
        */

        if (!Schema::hasTable('badges')) {
            Schema::create('badges', function (Blueprint $table) {
                $table->id();

                $table->string('slug')->nullable();
                $table->string('name');
                $table->text('description')->nullable();

                $table->string('icon')
                    ->default('workspace_premium');

                $table->string('color')
                    ->default('primary');

                $table->string('unlock_type')
                    ->nullable();

                $table->unsignedInteger('unlock_value')
                    ->default(1);

                $table->text('unlock_text')
                    ->nullable();

                $table->unsignedInteger('stars_reward')
                    ->default(0);

                $table->unsignedInteger('sort_order')
                    ->default(0);

                $table->boolean('active')
                    ->default(true);

                $table->timestamps();
            });
        } else {
            $hasSlug = Schema::hasColumn('badges', 'slug');
            $hasName = Schema::hasColumn('badges', 'name');
            $hasDescription = Schema::hasColumn('badges', 'description');
            $hasIcon = Schema::hasColumn('badges', 'icon');
            $hasColor = Schema::hasColumn('badges', 'color');
            $hasUnlockType = Schema::hasColumn('badges', 'unlock_type');
            $hasUnlockValue = Schema::hasColumn('badges', 'unlock_value');
            $hasUnlockText = Schema::hasColumn('badges', 'unlock_text');
            $hasStarsReward = Schema::hasColumn('badges', 'stars_reward');
            $hasSortOrder = Schema::hasColumn('badges', 'sort_order');
            $hasActive = Schema::hasColumn('badges', 'active');
            $hasCreatedAt = Schema::hasColumn('badges', 'created_at');
            $hasUpdatedAt = Schema::hasColumn('badges', 'updated_at');

            Schema::table('badges', function (Blueprint $table) use (
                $hasSlug,
                $hasName,
                $hasDescription,
                $hasIcon,
                $hasColor,
                $hasUnlockType,
                $hasUnlockValue,
                $hasUnlockText,
                $hasStarsReward,
                $hasSortOrder,
                $hasActive,
                $hasCreatedAt,
                $hasUpdatedAt
            ) {
                if (!$hasSlug) {
                    $table->string('slug')->nullable();
                }

                if (!$hasName) {
                    $table->string('name')->nullable();
                }

                if (!$hasDescription) {
                    $table->text('description')->nullable();
                }

                if (!$hasIcon) {
                    $table->string('icon')
                        ->default('workspace_premium');
                }

                if (!$hasColor) {
                    $table->string('color')
                        ->default('primary');
                }

                if (!$hasUnlockType) {
                    $table->string('unlock_type')
                        ->nullable();
                }

                if (!$hasUnlockValue) {
                    $table->unsignedInteger('unlock_value')
                        ->default(1);
                }

                if (!$hasUnlockText) {
                    $table->text('unlock_text')
                        ->nullable();
                }

                if (!$hasStarsReward) {
                    $table->unsignedInteger('stars_reward')
                        ->default(0);
                }

                if (!$hasSortOrder) {
                    $table->unsignedInteger('sort_order')
                        ->default(0);
                }

                if (!$hasActive) {
                    $table->boolean('active')
                        ->default(true);
                }

                if (!$hasCreatedAt) {
                    $table->timestamp('created_at')
                        ->nullable();
                }

                if (!$hasUpdatedAt) {
                    $table->timestamp('updated_at')
                        ->nullable();
                }
            });
        }

        /*
        |--------------------------------------------------------------------------
        | USER_BADGES
        |--------------------------------------------------------------------------
        */

        if (!Schema::hasTable('user_badges')) {
            Schema::create('user_badges', function (Blueprint $table) {
                $table->id();

                $table->foreignId('user_id')
                    ->constrained('users')
                    ->cascadeOnDelete();

                $table->foreignId('badge_id')
                    ->constrained('badges')
                    ->cascadeOnDelete();

                $table->timestamp('earned_at')
                    ->nullable();

                $table->timestamps();

                $table->unique([
                    'user_id',
                    'badge_id',
                ]);
            });
        } else {
            $hasEarnedAt = Schema::hasColumn(
                'user_badges',
                'earned_at'
            );

            $hasCreatedAt = Schema::hasColumn(
                'user_badges',
                'created_at'
            );

            $hasUpdatedAt = Schema::hasColumn(
                'user_badges',
                'updated_at'
            );

            Schema::table(
                'user_badges',
                function (Blueprint $table) use (
                    $hasEarnedAt,
                    $hasCreatedAt,
                    $hasUpdatedAt
                ) {
                    if (!$hasEarnedAt) {
                        $table->timestamp('earned_at')
                            ->nullable();
                    }

                    if (!$hasCreatedAt) {
                        $table->timestamp('created_at')
                            ->nullable();
                    }

                    if (!$hasUpdatedAt) {
                        $table->timestamp('updated_at')
                            ->nullable();
                    }
                }
            );
        }
    }

    public function down(): void
    {
        /*
         * No eliminamos columnas porque badges y user_badges
         * ya pertenecían al proyecto antes de esta mejora.
         */
    }
};