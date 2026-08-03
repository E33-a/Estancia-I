<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Lab404\Impersonate\Models\Impersonate; // <-- 1. Importamos la clase

class User extends Authenticatable
{
    use HasFactory, Notifiable, Impersonate; // <-- 2. Añadimos el Trait aquí

    // CONSTANTES DE ROLES (Clean Code)
    public const ROLE_STUDENT = 'student';
    public const ROLE_TEACHER = 'teacher';
    public const ROLE_ADMIN   = 'admin';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Helpers Legibles y Robustos
    public function isStudent(): bool
    {
        return $this->role === self::ROLE_STUDENT;
    }

    public function isTeacher(): bool
    {
        return $this->role === self::ROLE_TEACHER;
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    // --- LÓGICA DE IMPERSONACIÓN ---

    /**
     * Define si este usuario tiene permiso para suplantar a otros.
     */
    public function canImpersonate(): bool
    {
        // Aprovechamos tu helper de rol existente
        return $this->isAdmin();
    }

    /**
     * Define si este usuario puede ser suplantado por un Administrador.
     */
    public function canBeImpersonated(): bool
    {
        // Evitamos que un Admin pueda suplantar a otro Admin
        return !$this->isAdmin();
    }

    // Relaciones
    public function studentProfile(): HasOne
    {
        return $this->hasOne(StudentProfile::class);
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'user_badges')
                    ->withPivot('progress', 'completed')
                    ->withTimestamps();
    }
}