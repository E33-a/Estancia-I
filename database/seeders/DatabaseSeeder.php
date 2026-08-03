<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. CREAR ADMINISTRADOR GENERAL
        User::factory()->create([
            'name'     => 'José Sánchez',
            'email'    => 'jesanchezrom@gmail.com',
            'password' => Hash::make('password'),
            'role'     => User::ROLE_ADMIN, // 'admin'
        ]);

        // 2. CREAR AL DOCENTE (MAESTRO)
        User::factory()->create([
            'name'     => 'Profesor Admin',
            'email'    => 'profe@yolitzli.com',
            'password' => Hash::make('password'),
            'role'     => User::ROLE_TEACHER, // 'teacher'
        ]);

        // 3. CREAR ALUMNOS DE PRUEBA
        $students = [
            [
                'name'  => 'Juanito Pérez',
                'email' => 'juan@alumno.com',
            ],
            [
                'name'  => 'María González',
                'email' => 'maria@alumno.com',
            ],
            [
                'name'  => 'Pedrito López',
                'email' => 'pedro@alumno.com',
            ],
        ];

        foreach ($students as $data) {
            $student = User::factory()->create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make('password'),
                'role'     => User::ROLE_STUDENT, // 'student'
            ]);

            // Perfil de estudiante para gamificación
            $student->studentProfile()->create([
                'level'            => 1,
                'level_progress'   => 0,
                'stars'            => 10,
                'stories_read'     => 0,
                'selected_dialect' => 'Español',
            ]);
        }

        // 4. OTROS SEEDERS
        $this->call([
            VideoSeeder::class,
            StorySeeder::class,
        ]);
    }
}