<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Progress;
use Illuminate\Http\Request;

class DocenteController extends Controller
{
    public function index()
    {
        $totalActivities = 40; 

        // 1. OBTENER ALUMNOS (Consulta Simplificada)
        // Simplemente buscamos a todos los que tengan rol 0.
        // Si tus alumnos tienen rol 0 en la base de datos, ESTO LOS VA A ENCONTRAR.
        $students = User::where('role', 0)->get()->map(function ($student) use ($totalActivities) {
            
            // Intentamos obtener el progreso, si falla, ponemos 0
            try {
                $completedCount = Progress::where('user_id', $student->id)->count();
                $lastProg = Progress::where('user_id', $student->id)->latest()->first();
            } catch (\Exception $e) {
                $completedCount = 0;
                $lastProg = null;
            }
            
            $percentage = $totalActivities > 0 ? min(round(($completedCount / $totalActivities) * 100), 100) : 0;
            
            $activityText = 'Sin actividad';
            if ($lastProg) {
                $typeLabel = match($lastProg->type) {
                    'juego' => 'Jugó',
                    'video' => 'Vio video',
                    'cuento' => 'Leyó',
                    'ejercicio' => 'Practicó',
                    default => 'Actividad'
                };
                $activityText = $typeLabel . ' (' . $lastProg->created_at->diffForHumans() . ')';
            }

            return [
                'id' => $student->id,
                'name' => $student->name,
                'email' => $student->email,
                'progress' => $percentage, 
                'status' => $percentage > 0 ? 'Activo' : 'Nuevo', 
                'last_activity' => $activityText 
            ];
        });

        // 2. ESTADÍSTICAS
        $stats = [
            [ 
                'id' => 'all', 
                'title' => 'Total Alumnos', 
                'value' => $students->count(), 
                'icon' => '👥', 
                'color' => 'bg-blue-100', 
                'border' => 'border-blue-300', 
                'text' => 'text-blue-600' 
            ],
            [ 
                'id' => 'active', 
                'title' => 'Alumnos Activos', 
                'value' => $students->where('status', 'Activo')->count(), 
                'icon' => '⚡', 
                'color' => 'bg-green-100', 
                'border' => 'border-green-300', 
                'text' => 'text-green-600' 
            ],
            [ 
                'id' => 'progress', 
                'title' => 'Avance Global', 
                'value' => ($students->count() > 0 ? round($students->avg('progress')) : 0) . '%', 
                'icon' => '📈', 
                'color' => 'bg-yellow-100', 
                'border' => 'border-yellow-300', 
                'text' => 'text-yellow-600' 
            ],
             [ 
                'id' => 'activity', 
                'title' => 'Actividades Totales', 
                'value' => Progress::count(), 
                'icon' => '🎮', 
                'color' => 'bg-purple-100', 
                'border' => 'border-purple-300', 
                'text' => 'text-purple-600' 
            ],
        ];

        return Inertia::render('Docente', [
            'students' => $students,
            'stats' => $stats
        ]);
    }
}