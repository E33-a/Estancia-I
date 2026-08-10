<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class StoryController extends Controller
{
    public function index(): Response
    {
        $stories = [
            [
                'id' => 1,
                'title' => 'El Conejo en la Luna',
                'description' => 'Una tierna historia prehispánica sobre la generosidad y el sacrificio de un pequeño conejo.',
                'language' => 'Náhuatl',
                'level' => 'Básico',
                'category' => 'Mitos',
                'duration' => 5,
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGMW6s9OzpEueAKda_B56kioU_VKPcxcLF8Pr-Ex-A8DNXLCxlmP-_ri-1BFFr6BgN7qI2Eb_Ae49o_9mLZ_UDjGTqy76y7PTq7Jl9EfHbZ-IYZMHV2APkI0u0MfMsEOZou3qZ4PNno1v_ShEjc4cxI6baD9ybuRX0keeOWz3ZzkC3qYo0hKbN9qGYQMxjdEcwjUjHqaeizfYqVXztp7K9aYV_XSTks7hIZVINTJzCv6DVjGKjzXL0',
            ],

            [
                'id' => 2,
                'title' => 'La Leyenda del Cempasúchil',
                'description' => 'Descubre por qué esta flor ilumina el camino de regreso de nuestros seres queridos cada año.',
                'language' => 'Otomí',
                'level' => 'Intermedio',
                'category' => 'Leyendas',
                'duration' => 8,
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYIZdGxaj98lRaE-AoZRbY5_VVse2hLeGMhQTOkfqzo8GEd5O0l-_vecIZUCWvX6WQwl51OZCveqJ4gc9pGXKkOas74wjcICeY8UYBYoor8_YWRYUWOjnVFDyktMwlINaC5UotMbHFjc8CL1a-IhWaWhua08W86lkJQmsw8HqE2l2H4Smg21Om3N2TrFM9bhJP5Lfpmo5K-VbCSfqd-TuCpyogIiinciNO3GhDlgEvnciryGjcfno2',
            ],

            [
                'id' => 3,
                'title' => 'El Canto del Cenzontle',
                'description' => '¿Por qué el Cenzontle tiene tantas voces? Una fábula sobre el don de la música y la observación.',
                'language' => 'Náhuatl',
                'level' => 'Básico',
                'category' => 'Naturaleza',
                'duration' => 4,
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKxNZ6BhR4BXgxNEhlVNKpHCEFqJ-Tx02aYvEdWf23lUyvkf0JqvRv1ZbbcmM9Bp2APly8RXOANvVyFzCj-aquhhGGTYaqDouMhMeFLn-8UmDSwgmdTAk1sUtK9zhvlupqi9aigRBZJUEQRj4IBgZbbMM0G_curGNDsz1vRzd4VrZH1SOMGuHIBR2Hh3dYpssUzEwNQ6ERp4sLDiZdpfdAO91quZJt5o2mn7dhvgOe_AscVbgbXj9H',
            ],

            [
                'id' => 4,
                'title' => 'Los Guardianes de la Selva',
                'description' => 'Conoce a los pequeños seres que cuidan los bosques y milpas y descubre la importancia de proteger la naturaleza.',
                'language' => 'Otomí',
                'level' => 'Avanzado',
                'category' => 'Naturaleza',
                'duration' => 10,
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHUxRBP7qFbqq7ydjYUl5H1jnAI_OLfF7ZEQmiNiKwTyEWuREObpHis0D5__RG5wvAJcklSwNPAfze7QVVlIhAjO-BEA7lx3sfbHE6B8ibv9NXfiFj7Go5yVEPtY9MVDkZHIG2YXnJk9Xwl44JZsXSM4t5pRQdBRPSwkvWOH4iVRB3OUE6xd06gEaMJwvo9b2r72jX1g5SpsuUOifbxMwN-de0wm-W7GtGCopEArZP5TtDmAx_JoA8',
            ],

            [
                'id' => 5,
                'title' => 'El Secreto del Maíz',
                'description' => 'Una historia sobre la importancia del maíz en nuestra mesa y cómo aprendimos a sembrarlo.',
                'language' => 'Náhuatl',
                'level' => 'Básico',
                'category' => 'Vida Diaria',
                'duration' => 6,
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-QLOiFkzorYfllHjb5WW5aJYRlcTElMl-aVGl8hEyJbyfvICk0M5WmElCqSyL4Ep6q6M-RSyT08R8W1RmDTw7ARUOaq9Ga_somHC3rTL2ydI6a-HFFmY9kNLRwF02WMfzjn4x6lb6kiU60krSn4CjgRuYjvwxgIe17joN3RSQLQm5sT5qq42njiWooJfP8f8AVlNhlqx-ezqDOALh4NpNxyqZkT1DDpwN_DPs8Yx4MrD51iS3vSFm',
            ],

            [
                'id' => 6,
                'title' => 'El Jaguar y las Estrellas',
                'description' => 'Un mito sobre la creación de la noche y las manchas en la piel del jaguar.',
                'language' => 'Náhuatl',
                'level' => 'Intermedio',
                'category' => 'Mitos',
                'duration' => 7,
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_ezZhbWVFG81S4toi0QbiFq2xeFUuzkZaUiKwEHSBApLcr54CAx4u6dFADUybiQeH3a4cw-iaVlb1ZpQOxrr6GimywkMh4uoBbkGglaYO9cWN-9LOweXldl3W8Tp15ns45eZRQ2jVjePxo1YetjbWVyVcnv5yTBxh4ewAiWonEKz_nmvARPaPUzwCPPjSFtu2VzX0dvdi01Ho-gIALRqy3TrH_CjtKZZEc8eorH00CU6VXZ75Zk-t',
            ],
        ];

        $featuredStory = [
            'id' => 7,
            'title' => 'El Viaje de Mixcoatl',
            'description' => 'Descubre los misterios del cielo en esta aventura ancestral narrada completamente en Náhuatl y Español.',
            'language' => 'Náhuatl',
            'level' => 'Intermedio',
            'category' => 'Mitos',
            'duration' => 9,
            'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoc2-umyzFHdEFjZClGRKeHNPFgKiRmZwh7mwDJie5UTx58akKopJTBt_FlYwZGSKvEeFzOJP5by5ybu7O7iD_s4qcV5o8N96O1txXkN78DAJdR6wE1CkwOXVd2yXX1QcnBL2h13rIUE23-9yXmHQeQBg_JhgwMHwSltfH1oliPH3nWCQCyZXGeXC7hO7BTjY_0fG22GY6WWSLRzJM74OktLAV_qMLZe1lYMUwA9IfanG10lhfQ3uH',
        ];

        return Inertia::render('Student/Stories/Index', [
            'stories' => $stories,
            'featuredStory' => $featuredStory,
        ]);
    }
}