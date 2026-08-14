<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasFactory;

    /*
    |--------------------------------------------------------------------------
    | Tabla
    |--------------------------------------------------------------------------
    |
    | Laravel intenta utilizar "lesson_progress",
    | pero nuestra migración creó "lesson_progresses".
    |
    */

    protected $table = 'lesson_progresses';

    protected $fillable = [
        'user_id',
        'lesson_id',
        'current_position',
        'started_at',
        'completed_at',
        'stars_awarded',
    ];

    protected $casts = [
        'current_position' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'stars_awarded' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }

    public function lesson()
    {
        return $this->belongsTo(
            Lesson::class
        );
    }
}