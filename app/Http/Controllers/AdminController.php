<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Muestra el panel de administración con sus métricas y usuarios recientes.
     */
    public function dashboard()
    {
        // 1. Obtener los últimos 5 u 8 usuarios registrados
        $recentUsers = User::latest()
            ->take(8)
            ->get(['id', 'name', 'email', 'role', 'created_at']);

        // 2. Calcular las estadísticas para las tarjetas de arriba (StatCard)
        $stats = [
            'totalUsers'     => User::count(),
            'activeTeachers' => User::where('role', 'teacher')->count(),
            'students'       => User::where('role', 'student')->count(),
            'serverUptime'   => '99.9%',
        ];

        // 3. Renderizar la vista pasando las props requeridas
        return Inertia::render('Admin/Dashboard', [
            'recentUsers'   => $recentUsers,
            'stats'         => $stats,
            'systemMetrics' => [
                'cpu' => 24, // Valores de ejemplo o métricas simuladas
                'ram' => 45,
            ],
        ]);
    }
}