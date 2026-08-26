import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ videos = [] }) {
    // Si la BD no tiene videos aún, mostramos videos de demostración didácticos
    const demoVideos = [
        {
            id: 1,
            title: 'Aprende los Números en Náhuatl (1 al 10)',
            language: 'Náhuatl',
            duration: '04:15 min',
            thumbnail: '🔢',
            url: '#'
        },
        {
            id: 2,
            title: 'Canción Infantil Zapoteca: Las Vocales del Sol',
            language: 'Zapoteco',
            duration: '03:40 min',
            thumbnail: '🎶',
            url: '#'
        },
        {
            id: 3,
            title: 'Vocabulario de la Naturaleza en Maya',
            language: 'Maya',
            duration: '05:10 min',
            thumbnail: '🌿',
            url: '#'
        }
    ];

    const displayVideos = videos.length > 0 ? videos : demoVideos;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                        🎬 Catálogo de Videos Educativos y Multimedia
                    </h2>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        Audio y Video HD
                    </span>
                </div>
            }
        >
            <Head title="Videos Educativos" />

            <div className="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayVideos.map((vid) => (
                            <div
                                key={vid.id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-between"
                            >
                                <div className="flex h-48 items-center justify-center bg-gradient-to-tr from-purple-600 to-indigo-500 text-6xl text-white">
                                    {vid.thumbnail || '🎥'}
                                </div>
                                <div className="p-5">
                                    <span className="inline-flex rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 mb-2">
                                        {vid.language || 'Multilingüe'}
                                    </span>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        {vid.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        ⏱️ Duración: {vid.duration || '05:00 min'}
                                    </p>
                                </div>
                                <div className="p-5 pt-0">
                                    <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                        ▶️ Reproducir Video
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
