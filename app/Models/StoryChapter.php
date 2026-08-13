<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoryChapter extends Model
{
    protected $fillable = [
        'story_id',
        'chapter_number',
        'title',
        'spanish_text',
        'target_text',
        'vocabulary',
        'image_url',
        'audio_url',
    ];

    protected $casts = [
        'chapter_number' => 'integer',
        'vocabulary' => 'array',
    ];

    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }
}