<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\StoryProgress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoryController extends Controller
{
    public function index(): Response
    {
        $featured = Story::query()
            ->where('published', true)
            ->where('is_featured', true)
            ->withCount('chapters')
            ->first();

        $stories = Story::query()
            ->where('published', true)
            ->where('is_featured', false)
            ->withCount('chapters')
            ->orderBy('id')
            ->get()
            ->map(fn (Story $story) => $this->formatCard($story))
            ->values()
            ->all();

        return Inertia::render('Student/Stories/Index', [
            'stories' => $stories,

            'featuredStory' => $featured
                ? $this->formatCard($featured)
                : null,
        ]);
    }

    public function show(Story $story): Response
    {
        abort_unless($story->published, 404);

        $story->load([
            'chapters' => function ($query) {
                $query->orderBy('chapter_number');
            },
        ]);

        $progress = StoryProgress::query()
            ->where('user_id', auth()->id())
            ->where('story_id', $story->id)
            ->first();

        return Inertia::render('Student/Stories/Reader', [
            'story' => [
                'id' => $story->id,
                'slug' => $story->slug,
                'title' => $story->title,
                'description' => $story->description,
                'language' => $story->language,
                'category' => $story->category,
                'level' => $story->level,
                'duration' => $story->duration,
                'image' => $story->image_url,
                'coverEmoji' => $story->cover_emoji,

                'chapters' => $story->chapters
                    ->map(fn ($chapter) => [
                        'id' => $chapter->id,
                        'number' => $chapter->chapter_number,
                        'title' => $chapter->title,

                        'spanishText' =>
                            $chapter->spanish_text,

                        'targetText' =>
                            $chapter->target_text,

                        'vocabulary' =>
                            $chapter->vocabulary ?? [],

                        'image' =>
                            $chapter->image_url,

                        'audioUrl' =>
                            $chapter->audio_url,
                    ])
                    ->values()
                    ->all(),
            ],

            'progress' => [
                'lastChapter' =>
                    $progress?->last_chapter_number ?? 1,

                'completed' =>
                    $progress?->completed_at !== null,
            ],
        ]);
    }

    public function saveProgress(
        Request $request,
        Story $story
    ): JsonResponse {
        $data = $request->validate([
            'chapter_number' => [
                'required',
                'integer',
                'min:1',
            ],

            'completed' => [
                'nullable',
                'boolean',
            ],
        ]);

        $progress = StoryProgress::firstOrNew([
            'user_id' => auth()->id(),
            'story_id' => $story->id,
        ]);

        $currentChapter =
            $progress->last_chapter_number ?? 1;

        $progress->last_chapter_number = max(
            $currentChapter,
            $data['chapter_number']
        );

        if ($data['completed'] ?? false) {
            $progress->completed_at = now();
        }

        $progress->save();

        return response()->json([
            'saved' => true,
            'completed' =>
                $progress->completed_at !== null,
        ]);
    }

    private function formatCard(
        Story $story
    ): array {
        return [
            'id' => $story->id,
            'slug' => $story->slug,
            'title' => $story->title,
            'description' => $story->description,
            'language' => $story->language,
            'category' => $story->category,
            'level' => $story->level,
            'duration' => $story->duration,
            'image' => $story->image_url,
            'coverEmoji' => $story->cover_emoji,
            'chapters' => $story->chapters_count,
        ];
    }
}