<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameResult extends Model
{
    protected $fillable = [
        'result_uuid',
        'user_id',
        'game_key',
        'score',
        'earned_stars',
        'lives_remaining',
        'max_lives',
        'elapsed_seconds',
        'won',
        'metadata',
        'played_at',
    ];

    protected $casts = [
        'score' => 'integer',
        'earned_stars' => 'integer',
        'lives_remaining' => 'integer',
        'max_lives' => 'integer',
        'elapsed_seconds' => 'integer',
        'won' => 'boolean',
        'metadata' => 'array',
        'played_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class
        );
    }
}