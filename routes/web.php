<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\GameController;
use App\Models\User; // <-- Añadido para hacer referencia a la clase User
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --------------------------------------------------------------------------
// Ruta de Bienvenida (Landing Page)
// --------------------------------------------------------------------------
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// --------------------------------------------------------------------------
// Rutas Protegidas por Autenticación
// --------------------------------------------------------------------------
Route::middleware(['auth', 'verified'])->group(function () {

    // Redirección central inteligente según el rol del usuario
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // ----------------------------------------------------------------------
    // Impersonación: Salir de la suplantación (Disponible para cualquier usuario autenticado)
    // ----------------------------------------------------------------------
    Route::get('/impersonate/leave', function () {
        auth()->user()->leaveImpersonation();
        return redirect()->route('admin.dashboard');
    })->name('impersonate.leave');

    // ----------------------------------------------------------------------
    // Área Exclusiva de Estudiantes (rol: student)
    // ----------------------------------------------------------------------
    Route::middleware(['role:student'])->group(function () {
        Route::get('/student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');
        Route::get('/juegos', [GameController::class, 'index'])
    ->name('games.index');
        
        // Recursos accesibles para alumnos
        Route::get('/cuentos', [StoryController::class, 'index'])->name('stories.index');
        Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
        Route::post('/progress', [ProgressController::class, 'store'])->name('progress.store');
    });

    // ----------------------------------------------------------------------
    // Área Exclusiva de Docentes (rol: teacher)
    // ----------------------------------------------------------------------
    Route::middleware(['role:teacher'])->group(function () {
        Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');
    });

    // ----------------------------------------------------------------------
    // Área Exclusiva de Administradores (rol: admin)
    // ----------------------------------------------------------------------
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        // Impersonación: Iniciar suplantación (Solo ejecutable por Admins)
        Route::get('/impersonate/take/{id}', function ($id) {
            $userToImpersonate = User::findOrFail($id);

            if (auth()->user()->canImpersonate() && $userToImpersonate->canBeImpersonated()) {
                auth()->user()->impersonate($userToImpersonate);

                return match ($userToImpersonate->role) {
                    User::ROLE_TEACHER => redirect()->route('teacher.dashboard'),
                    User::ROLE_STUDENT => redirect()->route('student.dashboard'),
                    default            => redirect()->route('dashboard'),
                };
            }

            return back()->with('error', 'No tienes permisos para suplantar a este usuario.');
        })->name('impersonate');
    });

    // ----------------------------------------------------------------------
    // Perfil del Usuario (Accesible por todos los usuarios autenticados)
    // ----------------------------------------------------------------------
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';