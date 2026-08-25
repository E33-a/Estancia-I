<?php

namespace Database\Seeders;

use App\Models\Story;
use App\Models\StoryProgress;
use App\Models\User;
use Illuminate\Database\Seeder;

class StoryProgressSeeder extends Seeder
{
    public function run(): void
    {
        $stories = Story::with('chapters')->get();

        if ($stories->isEmpty()) {
            return;
        }

        User::where('role', User::ROLE_STUDENT)->get()->each(function (User $student) use ($stories) {
            $studentStories = $stories->random(min($stories->count(), random_int(1, 2)));

            foreach ($studentStories as $story) {
                $totalChapters = max(1, $story->chapters->count());
                $lastChapter = random_int(1, $totalChapters);
                $completed = $lastChapter >= $totalChapters && (bool) random_int(0, 1);

                StoryProgress::updateOrCreate(
                    [
                        'user_id' => $student->id,
                        'story_id' => $story->id,
                    ],
                    [
                        'last_chapter_number' => $lastChapter,
                        'completed_at' => $completed ? now()->subDays(random_int(0, 10)) : null,
                    ]
                );
            }
        });
    }
}
