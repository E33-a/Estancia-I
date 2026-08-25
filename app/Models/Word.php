<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = ['variant_id', 'user_id', 'term', 'translation', 'audio_path', 'audio_duration', 'audio_status'];

    public function variant()
    {
        return $this->belongsTo(Variant::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}