import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ randomVideos = [], randomStories = [], randomExercises = [], randomGames = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Explorador' };
    const [selectedLanguage, setSelectedLanguage] = useState('Todos');
    const [activeTab, setActiveTab] = useState('todos');

    // Módulos de datos enriquecidos si vienen vacíos
    const storiesList = randomStories.length > 0 ? randomStories : [
        { id: 1, title: "Tz'unun y el Colibrí Dorado", language: "Náhuatl", category: "Cuento", level: "Primaria Baja", stars: 5, cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80" },
        { id: 2, title: "El Conejo en la Luna (Metztli)", language: "Maya", category: "Leyenda", level: "Todas las edades", stars: 5, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80" },
        { id: 3, title: "El Maíz Sagrado y la Serpiente", language: "Zapoteco", category: "Mito", level: "Primaria Alta", stars: 4, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
    ];

    const gamesList = randomGames.length > 0 ? randomGames : [
        { title: 'Memorama Náhuatl', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        { title: 'Lotería de Palabras', img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=300&q=80', color: 'bg-amber-50 text-amber-700 border-amber-200' },
        { title: 'Emparejar Vocabulario', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=300&q=80', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    ];

    const filteredStories = selectedLanguage === 'Todos' 
        ? storiesList 
        : storiesList.filter(s => s.language?.toLowerCase() === selectedLanguage.toLowerCase());

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                            <span>¡Cualli tonalli, {user.name}!</span> 👋
                        </h2>
                        <p className="text-sm text-emerald-600 dark:text-emerald-300 mt-1">
                            ¡Continúa tu aventura aprendiendo las lenguas originarias de México!
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700">
                        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg dark:bg-emerald-900 dark:text-emerald-200">
                            Nivel 2: Explorador
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                            ⭐ 450 Pts
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Panel del Estudiante - Yoliztli" />

            <div className="py-8 bg-emerald-50/50 dark:bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* TARJETAS DE ESTADÍSTICAS / KPI LÚDICOS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-emerald-100 dark:border-gray-700 hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Cuentos Leídos</p>
                                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">12 / 15</h3>
                                </div>
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 rounded-2xl text-2xl">
                                    📚
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-amber-100 dark:border-gray-700 hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">Estrellas Ganadas</p>
                                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">340 ⭐</h3>
                                </div>
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300 rounded-2xl text-2xl">
                                    🏆
                                </div>
                            </div>
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-4 font-medium">+45 esta semana</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-indigo-100 dark:border-gray-700 hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Insignias Culturales</p>
                                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">8 Medallas</h3>
                                </div>
                                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-2xl text-2xl">
                                    🥇
                                </div>
                            </div>
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-4 font-medium">¡Maestro Nahuatlato!</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-teal-100 dark:border-gray-700 hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wider">Lengua Favorita</p>
                                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">Náhuatl</h3>
                                </div>
                                <div className="p-3 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300 rounded-2xl text-2xl">
                                    🗣️
                                </div>
                            </div>
                            <p className="text-xs text-teal-600 dark:text-teal-400 mt-4 font-medium">Variante Huasteca</p>
                        </div>
                    </div>

                    {/* FILTROS DE IDIOMA LÚDICOS */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Explorar por Lengua:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Todos', 'Náhuatl', 'Maya', 'Zapoteco', 'Otomí'].map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setSelectedLanguage(lang)}
                                    className={`px-4 py-1.5 rounded-xl text-sm font-medium transition ${
                                        selectedLanguage === lang
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECCIÓN 1: CUENTOS Y LEYENDAS RECOMENDADAS */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <span>📖 Cuentos e Historias Tradicionales</span>
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Lee y escucha las leyendas contadas por nuestros abuelos</p>
                            </div>
                            <Link
                                href={route('stories.index')}
                                className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                            >
                                Ver catálogo completo &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredStories.map((story, idx) => (
                                <div key={story.id || idx} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition flex flex-col justify-between">
                                    <div>
                                        <div className="relative h-44 overflow-hidden bg-gray-200">
                                            <img
                                                src={story.cover || story.img || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80"}
                                                alt={story.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                                                {story.language || 'Náhuatl'}
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-emerald-600 transition">
                                                {story.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                                                {story.description || 'Una hermosa historia que enseña el respeto por la naturaleza y nuestras costumbres originarias.'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-50 dark:border-gray-700/50">
                                        <span className="text-xs font-medium text-amber-500">
                                            {'⭐'.repeat(story.stars || 5)}
                                        </span>
                                        <Link
                                            href={route('stories.index')}
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                                        >
                                            Leer cuento
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECCIÓN 2: EJERCICIOS Y MINIJUEGOS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* EJERCICIOS PRÁCTICOS */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">✏️ Ejercicios Didácticos</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Practica la escritura y pronunciación</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {randomExercises.slice(0, 4).map((ex, i) => (
                                    <div key={i} className={`p-4 rounded-xl border ${ex.border || 'border-emerald-200'} ${ex.color || 'bg-emerald-50'} flex items-center gap-3 hover:scale-[1.02] transition cursor-pointer`}>
                                        <div className="text-2xl">📝</div>
                                        <div>
                                            <h5 className="font-bold text-sm text-gray-800 dark:text-gray-900">{ex.title}</h5>
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Comenzar</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* MINIJUEGOS INTERACTIVOS */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">🎮 Minijuegos de Vocabulario</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Aprende jugando con tus compañeros</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {gamesList.slice(0, 4).map((gm, i) => (
                                    <div key={i} className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/60 dark:bg-gray-700/50 flex items-center justify-between hover:scale-[1.02] transition cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">🕹️</div>
                                            <div>
                                                <h5 className="font-bold text-sm text-gray-800 dark:text-white">{gm.title}</h5>
                                                <span className="text-[11px] text-indigo-600 dark:text-indigo-300 font-medium">Emparejamiento</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-lg">Jugar</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* SECCIÓN 3: FRASE CULTURAL DEL DÍA */}
                    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 z-10">
                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Sabiduría Ancestral del Día
                            </span>
                            <h3 className="text-xl md:text-2xl font-black italic">
                                "Niltze! In ixtli in yollotl"
                            </h3>
                            <p className="text-sm text-emerald-100 max-w-xl">
                                Frase Náhuatl que significa: <span className="font-semibold text-white">"¡Hola! Con el rostro en la luz y el corazón en paz"</span>. Enseña a actuar siempre con verdad y sinceridad.
                            </p>
                        </div>
                        <Link
                            href={route('stories.index')}
                            className="bg-white text-emerald-900 font-extrabold px-6 py-3 rounded-2xl shadow-md hover:bg-emerald-50 transition text-sm whitespace-nowrap z-10"
                        >
                            Ver más leyendas
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
