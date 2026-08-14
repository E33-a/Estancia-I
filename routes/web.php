<?php

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
        Route::get(
    '/mis-logros',
    [AchievementController::class, 'index']
)->name('achievements.index');
        /*
|--------------------------------------------------------------------------
| Evaluaciones del estudiante
|--------------------------------------------------------------------------
*/

Route::get(
    '/evaluaciones',
    [AssessmentController::class, 'index']
)->name('assessments.index');

Route::post(
    '/evaluaciones/{assessment}/iniciar',
    [AssessmentController::class, 'start']
)->name('assessments.start');

Route::get(
    '/evaluaciones/intentos/{attempt}',
    [AssessmentController::class, 'take']
)->name('assessments.take');

Route::post(
    '/evaluaciones/intentos/{attempt}/enviar',
    [AssessmentController::class, 'submit']
)->name('assessments.submit');

Route::get(
    '/evaluaciones/intentos/{attempt}/resultado',
    [AssessmentController::class, 'result']
)->name('assessments.result');

        Route::get(
            '/student/dashboard',
            [StudentController::class, 'dashboard']
        )->name('student.dashboard');

        /*
        |--------------------------------------------------------------------------
        | Juegos
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/juegos',
            [GameController::class, 'index']
        )->name('games.index');

        Route::get(
            '/juegos/memorama',
            [GameController::class, 'memory']
        )->name('games.memory');

        Route::get(
            '/juegos/sopa-de-letras',
            [GameController::class, 'wordSearch']
        )->name('games.wordsearch');

        Route::get(
            '/juegos/relacionar',
            [GameController::class, 'matching']
        )->name('games.matching');

        Route::get(
            '/juegos/rompecabezas',
            [GameController::class, 'puzzle']
        )->name('games.puzzle');

        Route::get(
            '/juegos/dictado',
            [GameController::class, 'dictation']
        )->name('games.dictation');

        Route::get(
            '/juegos/trivia',
            [GameController::class, 'trivia']
        )->name('games.trivia');

        /*
        |--------------------------------------------------------------------------
        | Otros recursos del estudiante
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/cuentos',
            [StoryController::class, 'index']
        )->name('stories.index');
        Route::get(
        '/cuentos/{story}',
        [StoryController::class, 'show']
        )->name('stories.show');

        Route::post(
        '/cuentos/{story}/progreso',
        [StoryController::class, 'saveProgress']
        )->name('stories.progress');

        Route::get(
            '/videos',
            [VideoController::class, 'index']
        )->name('videos.index');

        Route::post(
            '/progress',
            [ProgressController::class, 'store']
        )->name('progress.store');
    });

    /*
    |--------------------------------------------------------------------------
    | Docentes
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:teacher'])->group(function () {

        Route::get(
            '/teacher/dashboard',
            [TeacherController::class, 'dashboard']
        )->name('teacher.dashboard');
    });

    /*
    |--------------------------------------------------------------------------
    | Administradores
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:admin'])->group(function () {

        Route::get(
            '/admin/dashboard',
            [AdminController::class, 'dashboard']
        )->name('admin.dashboard');

        Route::get('/impersonate/take/{id}', function ($id) {

            $userToImpersonate = User::findOrFail($id);

            if (
                auth()->user()->canImpersonate() &&
                $userToImpersonate->canBeImpersonated()
            ) {
                auth()->user()->impersonate($userToImpersonate);

                return match ($userToImpersonate->role) {
                    User::ROLE_TEACHER =>
                        redirect()->route('teacher.dashboard'),

                    User::ROLE_STUDENT =>
                        redirect()->route('student.dashboard'),

                    default =>
                        redirect()->route('dashboard'),
                };
            }

            return back()->with(
                'error',
                'No tienes permisos para suplantar a este usuario.'
            );

        })->name('impersonate');
    });

    /*
    |--------------------------------------------------------------------------
    | Perfil
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/profile',
        [ProfileController::class, 'edit']
    )->name('profile.edit');

    Route::patch(
        '/profile',
        [ProfileController::class, 'update']
    )->name('profile.update');

    Route::delete(
        '/profile',
        [ProfileController::class, 'destroy']
    )->name('profile.destroy');
});

require __DIR__.'/auth.php';