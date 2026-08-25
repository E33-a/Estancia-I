<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    protected $fillable = ['name', 'code', 'is_active'];

    public function teachers()
    {
        return $this->hasMany(User::class);
    }
}
