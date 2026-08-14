<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentQuestion extends Model
{
    protected $fillable = [
        'assessment_id',
        'type',
        'prompt',
        'instructions',
        'audio_text',
        'audio_path',
        'image_url',
        'options',
        'correct_answer',
        'explanation',
        'points',
        'position',
        'active',
    ];

    protected $casts = [
        'options' => 'array',
        'points' => 'integer',
        'position' => 'integer',
        'active' => 'boolean',
    ];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }
}