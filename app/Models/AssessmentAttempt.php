<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentAttempt extends Model
{
    protected $fillable = [
        'assessment_id',
        'user_id',
        'status',
        'question_ids',
        'score',
        'max_score',
        'percentage',
        'correct_count',
        'total_questions',
        'elapsed_seconds',
        'started_at',
        'submitted_at',
    ];

    protected $casts = [
        'question_ids' => 'array',
        'score' => 'integer',
        'max_score' => 'integer',
        'percentage' => 'float',
        'correct_count' => 'integer',
        'total_questions' => 'integer',
        'elapsed_seconds' => 'integer',
        'started_at' => 'datetime',
        'submitted_at' => 'datetime',
    ];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(
            AssessmentAnswer::class,
            'attempt_id'
        );
    }
}