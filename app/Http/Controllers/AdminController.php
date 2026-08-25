<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Muestra el panel principal.
     */
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'recentUsers' => User::latest()
                ->take(8)
                ->get(['id', 'name', 'email', 'role', 'created_at']),

            'stats' => [
                'totalUsers'     => User::count(),
                'activeTeachers' => User::where('role', User::ROLE_TEACHER)->count(),
                'students'       => User::where('role', User::ROLE_STUDENT)->count(),
                'serverUptime'   => 'Localhub',
            ],

            'systemMetrics' => null, 
        ]);
    }

    /**
     * Muestra la tabla completa de usuarios (basada en el diseño HTML).
     */
    public function users(Request $request)
    {
        $query = User::query();

        // Buscador por nombre o email
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filtro por Rol
        if ($role = $request->input('role')) {
            $query->where('role', $role);
        }

        // Filtro por Estado
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $users = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users'   => $users,
            'filters' => $request->only(['search', 'role', 'status']),
            'stats'   => [
                'totalUsers'     => User::count(),
                'activeTeachers' => User::where('role', 'teacher')->count(),
                'activeStudents' => User::where('role', 'student')->count(),
            ]
        ]);
    }

    /**
     * Cambia el estado del usuario (activo / inactivo).
     */
    public function toggleStatus(User $user)
    {
        $user->update([
            'status' => $user->status === 'active' ? 'inactive' : 'active'
        ]);

        return back();
    }
}