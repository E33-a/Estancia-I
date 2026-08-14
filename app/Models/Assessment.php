<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assessment extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'description',
        'language',
        'category',
        'passing_score',
        'question_limit',
        'time_limit_minutes',
        'max_attempts',
        'created_by',
        'available_to_all_students',
        'active',
    ];

    protected $casts = [
        'passing_score' => 'integer',
        'question_limit' => 'integer',
        'time_limit_minutes' => 'integer',
        'max_attempts' => 'integer',
        'available_to_all_students' => 'boolean',
        'active' => 'boolean',
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(AssessmentQuestion::class);
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(AssessmentAttempt::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'assessment_assignments',
            'assessment_id',
            'student_id'
        )
            ->withPivot([
                'assigned_by',
                'due_at',
            ])
            ->withTimestamps();
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}