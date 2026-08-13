<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VocabularyItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'language',
        'variant',
        'category',
        'spanish',
        'target',
        'emoji',
        'image_path',
        'audio_path',
        'puzzle_parts',
        'difficulty',
        'source_reference',
        'active',
    ];

    protected $casts = [
        'puzzle_parts' => 'array',
        'active' => 'boolean',
    ];
}