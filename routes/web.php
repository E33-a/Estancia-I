<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\VideoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta de bienvenida (Landing)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Rutas protegidas por autenticación
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard principal del Alumno
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Panel del Docente
    Route::get('/docente', [DocenteController::class, 'index'])->name('docente.index');
    
    // Cuentos y Leyendas
    Route::get('/cuentos', [StoryController::class, 'index'])->name('stories.index');
    
    // Videos Educativos
    Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
    
    // Progreso de Actividades
    Route::post('/progress', [ProgressController::class, 'store'])->name('progress.store');
    
    // Perfil del Usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
