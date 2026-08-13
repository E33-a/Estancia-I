<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'content',
        'description',
        'language',
        'category',
        'level',
        'duration',
        'cover_emoji',
        'image_url',
        'is_featured',
        'published',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'published' => 'boolean',
        'duration' => 'integer',
    ];

    public function chapters(): HasMany
    {
        return $this->hasMany(StoryChapter::class)
            ->orderBy('chapter_number');
    }

    public function progresses(): HasMany
    {
        return $this->hasMany(StoryProgress::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}