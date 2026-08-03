<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Punto de entrada central que redirige al usuario según su rol.
     */
    public function index(Request $request)
    {
        // Obtenemos el rol; si es nulo por alguna razón, asignamos 'student'
        $role = $request->user()->role ?? 'student';

        return match ($role) {
            'admin'   => redirect()->route('admin.dashboard'),
            'teacher' => redirect()->route('teacher.dashboard'),
            'student' => redirect()->route('student.dashboard'),
            default   => redirect()->route('student.dashboard'), // Fallback elegante sin pantalla 403
        };
    }
}