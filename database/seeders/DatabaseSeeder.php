<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
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

        // Docentes adicionales de prueba
        User::factory()->count(2)->create([
            'password' => Hash::make('password'),
            'role'     => User::ROLE_TEACHER,
        ]);

        // 3. CREAR ALUMNOS DE PRUEBA (fijos, con credenciales conocidas)
        $students = [
            ['name' => 'Juanito Pérez',    'email' => 'juan@alumno.com'],
            ['name' => 'María González',   'email' => 'maria@alumno.com'],
            ['name' => 'Pedrito López',    'email' => 'pedro@alumno.com'],
        ];

        foreach ($students as $data) {
            $student = User::factory()->create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make('password'),
                'role'     => User::ROLE_STUDENT,
            ]);

            $student->studentProfile()->create([
                'level'            => 1,
                'level_progress'   => 0,
                'stars'            => 10,
                'stories_read'     => 0,
                'selected_dialect' => 'Español',
            ]);
        }

        // Alumnos adicionales aleatorios, para tener un volumen más realista
        User::factory()->count(7)->create([
            'password' => Hash::make('password'),
            'role'     => User::ROLE_STUDENT,
        ])->each(function (User $student) {
            $student->studentProfile()->create([
                'level'            => random_int(1, 5),
                'level_progress'   => random_int(0, 100),
                'stars'            => random_int(0, 50),
                'stories_read'     => random_int(0, 6),
                'selected_dialect' => 'Español',
            ]);
        });

        // 4. CATÁLOGOS BASE (independientes entre sí)
        $this->call([
            SchoolSeeder::class,
            LanguageSeeder::class,
            VideoSeeder::class,
            StorySeeder::class,
            BadgeSeeder::class,
        ]);

        // 5. CONTENIDO DE APRENDIZAJE (orden importa: vocabulario antes de lecciones)
        $this->call([
            VocabularyItemSeeder::class,
            LessonSeeder::class,
            AssessmentSeeder::class,
        ]);

        // 6. DATOS DE ACTIVIDAD / PROGRESO DE LOS ALUMNOS
        $this->call([
            UserBadgeSeeder::class,
            LessonProgressSeeder::class,
            StoryProgressSeeder::class,
            GameResultSeeder::class,
            ProgressSeeder::class,
            AssessmentAttemptSeeder::class,
        ]);
    }
}
