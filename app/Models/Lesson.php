<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'level',
        'language',
        'stars_reward',
        'sort_order',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
        'stars_reward' => 'integer',
        'sort_order' => 'integer',
    ];

    public function vocabularyItems()
    {
        return $this
            ->belongsToMany(
                VocabularyItem::class,
                'lesson_vocabulary_item'
            )
            ->withPivot('position')
            ->withTimestamps()
            ->orderBy('lesson_vocabulary_item.position');
    }

    public function progresses()
    {
        return $this->hasMany(
            LessonProgress::class
        );
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}