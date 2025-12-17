<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    use HasFactory;

    // Permitimos que estos campos se puedan rellenar
    protected $fillable = [
        'user_id',
        'type',
        'item_id',
        'score',
        'completed'
    ];

    // Relación: Un progreso pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}