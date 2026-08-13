<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoryProgress extends Model
{
    /*
    |--------------------------------------------------------------------------
    | Nombre de la tabla
    |--------------------------------------------------------------------------
    |
    | Laravel interpreta "Progress" de una forma especial al pluralizar,
    | por eso indicamos explícitamente la tabla creada por nuestra migración.
    |
    */

    protected $table = 'story_progresses';

    protected $fillable = [
        'user_id',
        'story_id',
        'last_chapter_number',
        'completed_at',
    ];

    protected $casts = [
        'last_chapter_number' => 'integer',
        'completed_at' => 'datetime',
    ];

    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}