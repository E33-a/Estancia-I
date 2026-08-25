<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class TeacherController extends Controller
{
    /**
     * Dashboard para el rol de Profesor
     */
    public function dashboard()
    {
        return Inertia::render('Teacher/Dashboard');
    }

    /**
     * Gestión de contenidos del Profesor
     */
    public function contentManagement()
    {
        return Inertia::render('Teacher/ContentManagement');
    }

    /**
     * Evaluaciones del Profesor
     */
    public function assessments(Request $request): Response
    {
        return Inertia::render('Teacher/Assessments', [
            'scheduledAssessments' => [],
            'pastAssessments'      => [],
        ]);
    }

    /**
     * Muestra la Matriz de Educadores (Educator Matrix) para Administradores
     */
    public function index(): Response
    {
        $teacherQuery = User::where('role', 'teacher');

        // 1. Estadísticas usando únicamente la tabla "users"
        $stats = [
            'total_teachers'  => (clone $teacherQuery)->count(),
            'active_licenses' => (clone $teacherQuery)->where('status', 'active')->count(),
            // Cuenta las asignaciones únicas registradas en los usuarios para evitar consultar la tabla "schools"
            'covered_schools' => (clone $teacherQuery)->whereNotNull('assignment')->where('assignment', '!=', '')->distinct('assignment')->count(),
        ];

        // 2. Consulta y mapeo del listado de docentes
        $teachers = (clone $teacherQuery)
            ->get()
            ->map(fn ($teacher) => [
                'id'         => $teacher->code ?? ('RV-' . $teacher->id),
                'name'       => $teacher->name,
                'specialty'  => $teacher->specialty ?? 'Sin Especialidad',
                'assignment' => $teacher->assignment ?? 'Sin Asignación',
                'group'      => $teacher->group ?? null,
                'status'     => $teacher->status ?? 'inactive',
                'avatar'     => $teacher->avatar ?? null,
                'initials'   => Str::of($teacher->name)->headline()->explode(' ')->map(fn ($w) => $w[0] ?? '')->take(2)->join(''),
            ]);

        // 3. Docentes sin asignación actual
        $availableTeachers = (clone $teacherQuery)
            ->where(function ($q) {
                $q->whereNull('assignment')->orWhere('assignment', '');
            })
            ->get()
            ->map(fn ($teacher) => [
                'id'        => $teacher->id,
                'name'      => $teacher->name . ($teacher->specialty ? " ({$teacher->specialty})" : ''),
                'specialty' => $teacher->specialty ?? 'Gral.',
            ]);

        // 4. Destinos estáticos o generados dinámicamente desde las asignaciones
        $destinations = [
            ['id' => 'Escuela Benito Juárez', 'name' => 'Escuela Benito Juárez'],
            ['id' => 'Módulo Virtual Centro', 'name' => 'Módulo Virtual Centro'],
        ];

        return Inertia::render('Admin/Teachers/Index', [
            'stats'             => $stats,
            'teachers'          => $teachers,
            'availableTeachers' => $availableTeachers,
            'destinations'      => $destinations,
        ]);
    }

    /**
     * Procesa la asignación rápida de un docente
     */
    public function assign(Request $request)
    {
        $validated = $request->validate([
            'teacher_id'      => 'required|exists:users,id',
            'assignment_type' => 'required|in:virtual,physical',
            'destination_id'  => 'required',
        ]);

        $teacher = User::findOrFail($validated['teacher_id']);
        
        $teacher->update([
            'assignment_type' => $validated['assignment_type'],
            'assignment'      => $validated['destination_id'],
        ]);

        return back()->with('success', 'Docente vinculado con éxito.');
    }
}