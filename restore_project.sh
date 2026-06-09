#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "=== Iniciando restauración de la estructura de Yoliztli ==="

# 1. Eliminar archivos temporales o vacíos de 0 bytes que bloquean la creación de directorios
echo "-> Limpiando archivos vacíos que bloquean directorios..."
for item in app Auth Controllers Http Middleware Models Providers Requests cache config database factories laravel migrations seeders storage tests routes resources public; do
    if [ -f "$item" ] && [ ! -s "$item" ]; then
        echo "   Removiendo archivo vacío bloqueador: $item"
        rm "$item"
    fi
done

# 2. Crear la estructura de directorios estándar de Laravel
echo "-> Creando estructura de directorios..."
mkdir -p app/Http/Controllers/Auth
mkdir -p app/Http/Middleware
mkdir -p app/Http/Requests/Auth
mkdir -p app/Models
mkdir -p app/Providers
mkdir -p bootstrap/cache
mkdir -p config
mkdir -p database/migrations
mkdir -p database/seeders
mkdir -p database/factories
mkdir -p routes
mkdir -p resources/js
mkdir -p public
mkdir -p storage/app/public
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs

# 3. Mover archivos a sus respectivas carpetas
echo "-> Moviendo archivos del root a sus carpetas correctas..."

# Proveedores de Servicio
[ -f AppServiceProvider.php ] && mv AppServiceProvider.php app/Providers/

# Controladores de Autenticación
for f in AuthenticatedSessionController.php ConfirmablePasswordController.php EmailVerificationNotificationController.php EmailVerificationPromptController.php NewPasswordController.php PasswordController.php PasswordResetLinkController.php RegisteredUserController.php VerifyEmailController.php; do
    [ -f "$f" ] && mv "$f" app/Http/Controllers/Auth/
done

# Controladores Personalizados
for f in DocenteController.php DashboardController.php ProgressController.php StoryController.php VideoController.php Controller.php ProfileController.php; do
    [ -f "$f" ] && mv "$f" app/Http/Controllers/
done

# Middleware
[ -f HandleInertiaRequests.php ] && mv HandleInertiaRequests.php app/Http/Middleware/

# Modelos
for f in Progress.php Story.php User.php Video.php; do
    [ -f "$f" ] && mv "$f" app/Models/
done

# Configuraciones
for f in auth.php cache.php database.php filesystems.php logging.php mail.php queue.php services.php session.php; do
    [ -f "$f" ] && mv "$f" config/
done

# Migraciones
for f in 0001_01_01_000000_create_users_table.php 0001_01_01_000001_create_cache_table.php 0001_01_01_000002_create_jobs_table.php 2025_12_02_051234_create_videos_table.php 2025_12_05_052131_add_role_to_users_table.php 2025_12_05_055428_create_progress_table.php; do
    [ -f "$f" ] && mv "$f" database/migrations/
done

# Seeders
for f in DatabaseSeeder.php StorySeeder.php VideoSeeder.php; do
    [ -f "$f" ] && mv "$f" database/seeders/
done

# Factories
[ -f UserFactory.php ] && mv UserFactory.php database/factories/

# Bootstrap
[ -f app.php ] && mv app.php bootstrap/
[ -f packages.php ] && mv packages.php bootstrap/cache/
[ -f providers.php ] && mv providers.php bootstrap/

# Base de datos SQLite
[ -f database.sqlite ] && mv database.sqlite database/

# Mover archivos JS auxiliares a resources/js
for f in document-ready.js listbox-options.js types.js; do
    if [ -f "$f" ]; then
        mv "$f" resources/js/
    fi
done

# 4. Copiar archivos de Request desde los stubs de Laravel Breeze si no existen
echo "-> Copiando Requests de Breeze..."
if [ -d vendor/laravel/breeze/stubs ]; then
    cp vendor/laravel/breeze/stubs/default/app/Http/Requests/ProfileUpdateRequest.php app/Http/Requests/
    cp vendor/laravel/breeze/stubs/default/app/Http/Requests/Auth/LoginRequest.php app/Http/Requests/Auth/
    echo "   Requests copiados exitosamente."
else
    echo "   [WARNING] No se encontró la carpeta de stubs de Laravel Breeze. Deberás ejecutar 'composer install' primero."
fi

# 5. Crear archivos de Rutas
echo "-> Creando rutas en la carpeta routes/..."

cat << 'EOF' > routes/web.php
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
EOF

cat << 'EOF' > routes/auth.php
<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
EOF

cat << 'EOF' > routes/console.php
<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
EOF

# 6. Reestablecer el archivo composer.json completo
echo "-> Restaurando composer.json..."
cat << 'EOF' > composer.json
{
    "$schema": "https://getcomposer.org/schema.json",
    "name": "laravel/laravel",
    "type": "project",
    "description": "The skeleton application for the Laravel framework.",
    "keywords": ["laravel", "framework"],
    "license": "MIT",
    "require": {
        "php": "^8.2",
        "inertiajs/inertia-laravel": "^2.0",
        "laravel/framework": "^12.0",
        "laravel/sanctum": "^4.0",
        "laravel/tinker": "^2.10.1",
        "tightenco/ziggy": "^2.0"
    },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "laravel/breeze": "^2.3",
        "laravel/pail": "^1.2.2",
        "laravel/pint": "^1.13",
        "laravel/sail": "^1.41",
        "mockery/mockery": "^1.6",
        "nunomaduro/collision": "^8.6",
        "pestphp/pest": "^3.8",
        "pestphp/pest-plugin-laravel": "^3.2"
    },
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\": "tests/"
        }
    },
    "scripts": {
        "post-autoload-dump": [
            "@php artisan config:clear",
            "@php artisan clear-compiled",
            "@php artisan package:discover --ansi"
        ],
        "post-update-cmd": [
            "@php artisan vendor:publish --tag=laravel-assets --ansi --force"
        ],
        "post-root-package-install": [
            "@php -r \"file_exists('.env') || copy('.env.example', '.env');\""
        ],
        "post-create-project-cmd": [
            "@php artisan key:generate --ansi",
            "@php -r \"file_exists('database/database.sqlite') || touch('database/database.sqlite');\"",
            "@php artisan migrate --graceful --ansi"
        ],
        "dev": [
            "Composer\\Config::disableProcessTimeout",
            "npx concurrently -c \"#93c5fd,#c4b5fd,#fb7185,#fdba74\" \"php artisan serve\" \"php artisan queue:listen --tries=1\" \"php artisan pail --timeout=0\" \"npm run dev\" --names=server,queue,logs,vite"
        ],
        "test": [
            "@php artisan config:clear --ansi",
            "@php artisan test"
        ]
    },
    "extra": {
        "laravel": {
            "dont-discover": []
        }
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "sort-packages": true,
        "allow-plugins": {
            "pestphp/pest-plugin": true,
            "php-http/discovery": true
        }
    },
    "minimum-stability": "stable",
    "prefer-stable": true
}
EOF

# 7. Crear un archivo .env básico si no existe
echo "-> Verificando archivo .env..."
if [ ! -f .env ]; then
    echo "   Creando archivo .env..."
    cat << 'EOF' > .env
APP_NAME=Yoliztli
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost:8000

APP_LOCALE=es
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=es_ES

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=debug

DB_CONNECTION=sqlite
DB_DATABASE=/home/emmanuel/Desktop/Projects/Estancia-I/database/database.sqlite

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
CACHE_STORE=database

VITE_APP_NAME="${APP_NAME}"
EOF
    echo "   Archivo .env creado."
else
    echo "   El archivo .env ya existe."
fi

# 8. Dar permisos y avisar
echo "=== Restauración completa ==="
echo "Por favor ejecuta los siguientes comandos en tu terminal:"
echo "  1. composer install"
echo "  2. php artisan key:generate"
echo "  3. php artisan migrate:refresh --seed"
echo "  4. npm install"
echo "  5. npm run dev"
echo "============================================="
