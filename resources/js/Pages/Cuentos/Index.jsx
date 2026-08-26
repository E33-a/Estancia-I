import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedAge, setSelectedAge] = useState('Todos');

    const stories = [
        {
            id: 1,
            title: 'El Coyote y el Conejo',
            originTitle: 'In Coyotl iuan in Tochtli',
            language: 'Náhuatl',
            ageRange: '6-8 años',
            stars: 5,
            image: '🦊🐰',
            color: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300',
            description: 'Un cuento tradicional náhuatl sobre la astucia del pequeño conejo frente al hambriento coyote.'
        },
        {
            id: 2,
            title: 'La Leyenda del Colibrí',
            originTitle: "Tz'unun: El Mensajero de Pensamientos",
            language: 'Maya',
            ageRange: '6-8 años',
            stars: 5,
            image: '🐦✨',
            color: 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300',
            description: 'Los dioses mayas crearon al colibrí para llevar los deseos de paz entre los seres humanos.'
        },
        {
            id: 3,
            title: 'El Sol y la Luna Zapotecos',
            originTitle: 'Gubidxa ne Beu',
            language: 'Zapoteco',
            ageRange: '9-11 años',
            stars: 4,
            image: '☀️🌙',
            color: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300',
            description: 'La gran historia zapoteca que explica cómo el Sol y la Luna iluminan el cielo del Mayab.'
        },
        {
            id: 4,
            title: 'El Niño y el Árbol Sagrado',
            originTitle: 'Za: El Guardián del Bosque',
            language: 'Otomí',
            ageRange: '6-8 años',
            stars: 5,
            image: '🌳👦',
            color: 'bg-teal-100 dark:bg-teal-900/30 border-teal-300',
            description: 'Relato otomí sobre el respeto a la naturaleza y las enseñanzas de las ancianas sabias.'
        }
    ];

    const filteredStories = stories.filter(story => {
        const matchesCategory = selectedCategory === 'Todos' || story.language === selectedCategory;
        const matchesAge = selectedAge === 'Todos' || story.ageRange === selectedAge;
        return matchesCategory && matchesAge;
    });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                        📚 Catálogo de Cuentos Didácticos e Interactivos
                    </h2>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        Español / Lenguas Originarias
                    </span>
                </div>
            }
        >
            <Head title="Catálogo de Cuentos" />

            <div className="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Filtros de Búsqueda */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                    🔍 Filtrar Cuentos
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Selecciona por variante lingüística y rango de edad.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                        Lengua Originaria:
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="rounded-lg border-gray-300 text-sm focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="Todos">Todas las lenguas</option>
                                        <option value="Náhuatl">Náhuatl</option>
                                        <option value="Maya">Maya</option>
                                        <option value="Zapoteco">Zapoteco</option>
                                        <option value="Otomí">Otomí</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                        Rango de Edad:
                                    </label>
                                    <select
                                        value={selectedAge}
                                        onChange={(e) => setSelectedAge(e.target.value)}
                                        className="rounded-lg border-gray-300 text-sm focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="Todos">Todas las edades</option>
                                        <option value="6-8 años">6-8 años</option>
                                        <option value="9-11 años">9-11 años</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grilla de Cuentos */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                        {filteredStories.map((story) => (
                            <div
                                key={story.id}
                                className={`flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 ${story.color}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-4xl">{story.image}</span>
                                        <div className="flex items-center gap-1 bg-white/80 dark:bg-gray-900/60 px-3 py-1 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400">
                                            ⭐ {story.stars} Estrellas
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-extrabold text-gray-900 dark:text-white">
                                        {story.title}
                                    </h4>
                                    <p className="text-xs font-bold text-purple-700 dark:text-purple-300 italic mb-2">
                                        {story.originTitle}
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                        {story.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-200/60 pt-4 dark:border-gray-700">
                                    <span className="inline-flex items-center rounded-md bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                                        {story.language} ({story.ageRange})
                                    </span>
                                    <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white shadow hover:bg-purple-700 transition">
                                        📖 Leer Cuento
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
