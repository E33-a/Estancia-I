<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. CREAR AL DOCENTE (MAESTRO)
        // Este es el usuario con el que entrarás al Panel Docente
        User::factory()->create([
            'name' => 'Profesor Admin',
            'email' => 'profe@yolitzli.com',
            'password' => bcrypt('password'), // Contraseña: password
            'role' => 1, // <--- EL 1 SIGNIFICA DOCENTE
        ]);

        // 2. CREAR ALUMNOS DE PRUEBA
        // Estos usuarios entrarán al Dashboard Mágico de niños
        User::factory()->create([
            'name' => 'Juanito Pérez',
            'email' => 'juan@alumno.com',
            'password' => bcrypt('password'),
            'role' => 0, // <--- EL 0 SIGNIFICA ALUMNO
        ]);

        User::factory()->create([
            'name' => 'María González',
            'email' => 'maria@alumno.com',
            'password' => bcrypt('password'),
            'role' => 0,
        ]);

        User::factory()->create([
            'name' => 'Pedrito López',
            'email' => 'pedro@alumno.com',
            'password' => bcrypt('password'),
            'role' => 0,
        ]);

        // 3. LLAMAR A LOS OTROS SEMBRADORES
        // Esto llena los videos y cuentos automáticamente
        $this->call([
            VideoSeeder::class,
            StorySeeder::class,
        ]);
    }
}