<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Group;
use App\Models\Lesson;
use App\Models\Submission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(Request $request): Response
    {
        // 1. Lecciones y Grupos desde la BD
        $lessons = Lesson::select('id', 'title')->get();
        $groups = Group::select('id', 'name')->get();

        // 2. Entregas pendientes con datos del alumno y actividad (con eager loading)
        $pendingSubmissions = Submission::with(['student.user', 'assignment.lesson'])
            ->where('status', 'pending')
            ->latest()
            ->get()
            ->map(fn ($submission) => [
                'id' => $submission->id,
                'initials' => $submission->student->initials, // O un accesor en el modelo Student
                'student' => $submission->student->user->name,
                'activity' => $submission->assignment->lesson->title,
                'date' => $submission->created_at->diffForHumans(),
                'color_bg' => 'bg-primary-fixed',
                'color_text' => 'text-on-primary-fixed',
            ]);

        // 3. Perfil del docente autenticado
        $teacher = $request->user()->teacherProfile;

        return Inertia::render('Teacher/Task', [
            'lessons' => $lessons,
            'groups' => $groups,
            'pendingSubmissions' => $pendingSubmissions,
            'teacherProfile' => [
                'teacher_id' => $teacher?->teacher_id ?? 'N/A',
            ]
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'lesson_id'    => 'required|exists:lessons,id',
            'group_id'     => 'required|exists:groups,id',
            'due_date'     => 'required|date|after:now',
            'points'       => 'required|numeric|min:0',
            'instructions' => 'nullable|string',
        ]);

        // Guardar la nueva tarea/asignación en BD
        $request->user()->teacherProfile->assignments()->create($validated);

        return redirect()->back()->with('success', 'Tarea asignada exitosamente.');
    }
}