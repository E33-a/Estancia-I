<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    // El estudiante envía su tarea
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'assignment_id' => 'required|exists:assignments,id',
            'content'       => 'nullable|string',
        ]);

        Submission::create([
            'assignment_id' => $validated['assignment_id'],
            'student_id'    => $request->user()->student->id,
            'content'       => $validated['content'] ?? null,
            'status'        => 'pending',
        ]);

        return redirect()->back()->with('success', 'Tarea enviada con éxito.');
    }

    // El profesor califica la entrega
    public function update(Request $request, Submission $submission): RedirectResponse
    {
        $validated = $request->validate([
            'score' => 'required|numeric|min:0',
        ]);

        $submission->update([
            'score'  => $validated['score'],
            'status' => 'graded',
        ]);

        return redirect()->back()->with('success', 'Calificación registrada.');
    }
}