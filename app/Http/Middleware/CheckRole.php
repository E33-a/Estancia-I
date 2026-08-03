<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userRole = strtolower($user->role ?? User::ROLE_STUDENT);
        $allowedRoles = array_map('strtolower', $roles);

        // Si el rol no coincide con la ruta, redirigimos limpiamente
        if (!in_array($userRole, $allowedRoles)) {
            return match ($userRole) {
                User::ROLE_ADMIN   => redirect()->route('admin.dashboard'),
                User::ROLE_TEACHER => redirect()->route('teacher.dashboard'),
                default            => redirect()->route('student.dashboard'),
            };
        }

        return $next($request);
    }
}