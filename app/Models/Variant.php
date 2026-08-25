<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    protected $fillable = ['language_id', 'name', 'status'];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function words()
    {
        return $this->hasMany(Word::class);
    }
}