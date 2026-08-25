<?php

use App\Http\Controllers\LessonController;
use App\Http\Controllers\GameResultController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\AchievementController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\LinguisticDataController;
use App\Http\Controllers\SystemHealthController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Página principal
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Rutas autenticadas
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Salir de impersonación
    |--------------------------------------------------------------------------
    */

    Route::get('/impersonate/leave', function () {
        auth()->user()->leaveImpersonation();

        return redirect()->route('admin.dashboard');
    })->name('impersonate.leave');

    /*
    |--------------------------------------------------------------------------
    | Estudiantes
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:student'])->group(function () {
        Route::post('/juegos/resultados', [GameResultController::class, 'store'])->name('games.results.store');
        Route::get('/mis-logros', [AchievementController::class, 'index'])->name('achievements.index');
        
        // Lecciones
        Route::get('/lecciones', [LessonController::class, 'index'])->name('lessons.index');
        Route::get('/lecciones/{lesson}', [LessonController::class, 'show'])->name('lessons.show');
        Route::post('/lecciones/{lesson}/progreso', [LessonController::class, 'progress'])->name('lessons.progress');
        Route::post('/lecciones/{lesson}/completar', [LessonController::class, 'complete'])->name('lessons.complete');

        // Evaluaciones del estudiante
        Route::get('/evaluaciones', [AssessmentController::class, 'index'])->name('assessments.index');
        Route::post('/evaluaciones/{assessment}/iniciar', [AssessmentController::class, 'start'])->name('assessments.start');
        Route::get('/evaluaciones/intentos/{attempt}', [AssessmentController::class, 'take'])->name('assessments.take');
        Route::post('/evaluaciones/intentos/{attempt}/enviar', [AssessmentController::class, 'submit'])->name('assessments.submit');
        Route::get('/evaluaciones/intentos/{attempt}/resultado', [AssessmentController::class, 'result'])->name('assessments.result');

        Route::get('/student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');

        // Juegos
        Route::get('/juegos', [GameController::class, 'index'])->name('games.index');
        Route::get('/juegos/memorama', [GameController::class, 'memory'])->name('games.memory');
        Route::get('/juegos/sopa-de-letras', [GameController::class, 'wordSearch'])->name('games.wordsearch');
        Route::get('/juegos/relacionar', [GameController::class, 'matching'])->name('games.matching');
        Route::get('/juegos/rompecabezas', [GameController::class, 'puzzle'])->name('games.puzzle');
        Route::get('/juegos/dictado', [GameController::class, 'dictation'])->name('games.dictation');
        Route::get('/juegos/trivia', [GameController::class, 'trivia'])->name('games.trivia');

        // Recursos
        Route::get('/cuentos', [StoryController::class, 'index'])->name('stories.index');
        Route::get('/cuentos/{story}', [StoryController::class, 'show'])->name('stories.show');
        Route::post('/cuentos/{story}/progreso', [StoryController::class, 'saveProgress'])->name('stories.progress');
        Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
        Route::post('/progress', [ProgressController::class, 'store'])->name('progress.store');
    });

    /*
    |--------------------------------------------------------------------------
    | Docentes (Panel de Profesor)
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:teacher'])->group(function () {
        Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');
        Route::get('/teacher/content-management', [TeacherController::class, 'contentManagement'])->name('teacher.content-management');
        Route::get('/teacher/tasks', [TaskController::class, 'index'])->name('teacher.tasks');
        Route::post('/teacher/tasks', [TaskController::class, 'store'])->name('teacher.tasks.store');
        Route::get('/teacher/assessments', [TeacherController::class, 'assessments'])->name('teacher.assessments');
    });

    /*
    |--------------------------------------------------------------------------
    | Administradores
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

        // Matriz y Asignación Docente (Educator Matrix)
        Route::get('/teachers', [TeacherController::class, 'index'])->name('teachers.index');
        Route::post('/teachers/assign', [TeacherController::class, 'assign'])->name('teachers.assign');

        // Gestión de Datos Lingüísticos
        Route::get('/linguistic-data', [LinguisticDataController::class, 'index'])->name('linguistic.index');

        // Infraestructura y Salud del Sistema
        Route::get('/system-health', [SystemHealthController::class, 'index'])->name('system-health.index');

        // Gestión de usuarios
        Route::get('/users', [AdminController::class, 'users'])->name('users.index');
        Route::post('/users/{user}/toggle-status', [AdminController::class, 'toggleStatus'])->name('users.toggle-status');
    });

    /*
    |--------------------------------------------------------------------------
    | Impersonación (Solo Admin)
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:admin'])->get('/impersonate/take/{id}', function ($id) {
        $userToImpersonate = User::findOrFail($id);

        if (
            auth()->user()->canImpersonate() &&
            $userToImpersonate->canBeImpersonated()
        ) {
            auth()->user()->impersonate($userToImpersonate);

            return match ($userToImpersonate->role) {
                User::ROLE_TEACHER => redirect()->route('teacher.dashboard'),
                User::ROLE_STUDENT => redirect()->route('student.dashboard'),
                default => redirect()->route('dashboard'),
            };
        }

        return back()->with('error', 'No tienes permisos para suplantar a este usuario.');
    })->name('impersonate');

    /*
    |--------------------------------------------------------------------------
    | Perfil
    |--------------------------------------------------------------------------
    */

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';