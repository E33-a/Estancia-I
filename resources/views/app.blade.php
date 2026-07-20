<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="light">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fuentes e Iconos del Nuevo Diseño -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

        <!-- Tailwind CSS CDN con la paleta de colores de Raíces Vivas -->
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script>
            tailwind.config = {
                darkMode: "class",
                theme: {
                    extend: {
                        "colors": {
                            "inverse-primary": "#ffb4a2",
                            "outline-variant": "#dcc0ba",
                            "background": "#fdf7ff",
                            "surface-container-high": "#ede5f9",
                            "tertiary-fixed": "#ffddb8",
                            "on-tertiary-fixed": "#2a1700",
                            "on-primary-container": "#fffbff",
                            "surface-container": "#f3eaff",
                            "on-error": "#ffffff",
                            "tertiary-fixed-dim": "#ffb95f",
                            "surface-dim": "#ded7eb",
                            "on-tertiary-container": "#fffbff",
                            "primary": "#9a4028",
                            "inverse-on-surface": "#f5eeff",
                            "primary-container": "#b9573e",
                            "surface-container-lowest": "#ffffff",
                            "on-primary-fixed": "#3c0800",
                            "inverse-surface": "#322e3d",
                            "tertiary": "#825100",
                            "on-primary-fixed-variant": "#7e2b16",
                            "error": "#ba1a1a",
                            "tertiary-container": "#a36700",
                            "on-primary": "#ffffff",
                            "on-secondary-fixed-variant": "#1d5129",
                            "surface-tint": "#9d422b",
                            "primary-fixed": "#ffdbd2",
                            "on-background": "#1d1928",
                            "primary-fixed-dim": "#ffb4a2",
                            "on-secondary": "#ffffff",
                            "outline": "#89726c",
                            "on-secondary-fixed": "#002109",
                            "on-tertiary": "#ffffff",
                            "on-tertiary-fixed-variant": "#653e00",
                            "surface-container-highest": "#e7dff3",
                            "secondary": "#36693e",
                            "surface-bright": "#fdf7ff",
                            "surface-variant": "#e7dff3",
                            "secondary-fixed-dim": "#9cd4a0",
                            "surface": "#fdf7ff",
                            "secondary-container": "#b7f1ba",
                            "error-container": "#ffdad6",
                            "secondary-fixed": "#b7f1ba",
                            "on-surface-variant": "#56423d",
                            "surface-container-low": "#f8f1ff",
                            "on-secondary-container": "#3c6f44",
                            "on-error-container": "#93000a",
                            "on-surface": "#1d1928"
                        },
                        "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                        "spacing": { "margin-tablet": "40px", "xl": "32px", "lg": "24px", "gutter": "16px", "md": "16px", "sm": "12px", "xs": "4px", "margin-mobile": "20px", "base": "8px" },
                        "fontFamily": { "body-lg": ["Montserrat"], "body-md": ["Montserrat"], "headline-md": ["Bricolage Grotesque"], "headline-lg-mobile": ["Bricolage Grotesque"], "display-lg": ["Bricolage Grotesque"], "label-lg": ["Montserrat"], "headline-lg": ["Bricolage Grotesque"], "label-sm": ["Montserrat"] },
                        "fontSize": { "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}], "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}], "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}], "headline-lg-mobile": ["28px", {"lineHeight": "36px", "fontWeight": "700"}], "display-lg": ["40px", {"lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "800"}], "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}], "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "700"}], "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}] }
                    },
                },
            }
        </script>

        <style>
            .otomí-pattern {
                background-color: #fdf7ff;
                background-image: radial-gradient(#9a4028 0.5px, transparent 0.5px), radial-gradient(#9a4028 0.5px, #fdf7ff 0.5px);
                background-size: 20px 20px;
                background-position: 0 0, 10px 10px;
                opacity: 0.1;
            }
            .sunset-shadow { box-shadow: 0 10px 30px -5px rgba(154, 64, 40, 0.15); }
            .border-press { border-bottom: 3px solid rgba(0,0,0,0.2); }
            .border-press:active { border-bottom-width: 0; transform: translateY(2px); }
            .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
            body { min-height: max(884px, 100dvh); }
        </style>

        <!-- Scripts del Core de Laravel, Inertia y React (¡No tocar!) -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden">
        @inertia
    </body>
</html>