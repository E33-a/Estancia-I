<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Variant;
use App\Models\Word;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LinguisticDataController extends Controller
{
    /**
     * Muestra el panel de gestión de datos lingüísticos con datos reales de la BD.
     */
    public function index(Request $request): Response
    {
        // 1. Estadísticas reales
        $stats = [
            'activeLanguages' => Language::where('is_active', true)->count(),
            'registeredWords' => Word::count(),
            'pendingAudios'   => Word::where('audio_status', 'pending')->count(),
            'newVariants'     => Variant::where('status', 'draft')->count(),
        ];

        // 2. Lista de lenguas
        $languages = Language::select('id', 'name')->get();

        // 3. Consulta de palabras filtradas y paginadas
        $wordsQuery = Word::with('variant');

        if ($request->filled('search')) {
            $wordsQuery->where(function ($q) use ($request) {
                $q->where('term', 'like', "%{$request->search}%")
                  ->orWhere('translation', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('language')) {
            $wordsQuery->whereHas('variant.language', function ($q) use ($request) {
                $q->where('id', $request->language);
            });
        }

        $words = $wordsQuery->paginate(10)->through(fn ($word) => [
            'id'           => $word->id,
            'term'         => $word->term,
            'translation'  => $word->translation,
            'variant'      => $word->variant?->name ?? 'Sin variante',
            'audio_status' => $word->audio_status,
        ]);

        // 4. Audios pendientes por revisar
        $audioReviews = Word::with(['variant', 'author'])
            ->where('audio_status', 'pending')
            ->whereNotNull('audio_path')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($word) => [
                'id'        => $word->id,
                'word'      => $word->term,
                'duration'  => $word->audio_duration ? sprintf('%02d:%02d', floor($word->audio_duration / 60), $word->audio_duration % 60) : '0:00',
                'author'    => ($word->author?->name ?? 'Anónimo') . ($word->variant ? " ({$word->variant->name})" : ''),
                'audio_url' => asset('storage/' . $word->audio_path),
            ]);

        // 5. Variantes regionales
        $regionalVariants = Variant::withCount('words')
            ->get()
            ->map(fn ($variant) => [
                'id'           => $variant->id,
                'name'         => $variant->name,
                'count_label'  => $variant->status === 'draft' ? 'En revisión comunitaria' : number_format($variant->words_count) . ' vocablos',
                'status'       => $variant->status,
                'status_label' => $variant->status === 'active' ? 'Activa' : 'Borrador',
            ]);

        return Inertia::render('Admin/LinguisticData/Index', [
            'stats'            => $stats,
            'languages'        => $languages,
            'words'            => $words,
            'audioReviews'     => $audioReviews,
            'regionalVariants' => $regionalVariants,
            'filters'          => $request->only(['search', 'language']),
        ]);
    }
}