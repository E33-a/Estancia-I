<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Progress;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    /**
     * Guarda el progreso de una actividad.
     */
    public function store(Request $request)
    {
        // 1. Validar que los datos vengan bien
        $request->validate([
            'type' => 'required|string',    // 'juego', 'video', 'cuento'
            'item_id' => 'required|string', // 'n1', 'o3', etc.
            'score' => 'integer',           // Puntos (opcional)
        ]);

        // 2. Guardar o Actualizar el registro
        // updateOrCreate busca si ya existe un registro para este usuario y este item.
        // Si existe, lo actualiza. Si no, crea uno nuevo.
        Progress::updateOrCreate(
            [
                'user_id' => Auth::id(),    // El alumno actual
                'type' => $request->type,
                'item_id' => $request->item_id,
            ],
            [
                'score' => $request->score ?? 100, // Si no mandan puntos, asumimos 100 (completado)
                'completed' => true,
            ]
        );

        // 3. Responder que todo salió bien
        return response()->json(['message' => 'Progreso guardado correctamente']);
    }
}