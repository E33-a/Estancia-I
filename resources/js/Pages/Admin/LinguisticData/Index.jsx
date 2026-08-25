import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Admin/StatCard';

export default function LinguisticDataIndex({ 
    stats = { activeLanguages: 0, registeredWords: 0, pendingAudios: 0, newVariants: 0 },
    languages = [], 
    words = { data: [] }, 
    audioReviews = [], 
    regionalVariants = [],
    filters = {}
}) {
    const [searchWord, setSearchWord] = useState(filters.search || '');
    const [selectedLanguage, setSelectedLanguage] = useState(filters.language || '');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(
            route('admin.linguistic.index'),
            { search: searchWord, language: selectedLanguage },
            { preserveState: true, replace: true }
        );
    };

    const handleLanguageSelect = (langName) => {
        const newLang = selectedLanguage === langName ? '' : langName;
        setSelectedLanguage(newLang);
        router.get(
            route('admin.linguistic.index'),
            { search: searchWord, language: newLang },
            { preserveState: true, replace: true }
        );
    };

    const handleAudioAction = (audioId, action) => {
        router.post(route('admin.linguistic.audios.review', audioId), { action }, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Gestión de Datos Lingüísticos - Raíces Vivas">
            {/* Banner Header */}
            <header className="mb-xl relative z-10">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Gestión de Datos Lingüísticos</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                    Administración de bases de datos de lenguas originarias, variantes regionales y diccionarios comunitarios.
                </p>
            </header>

            {/* Tarjetas Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl relative z-10">
                <StatCard title="Lenguas Activas" value={stats.activeLanguages} icon="language" variant="primary" />
                <StatCard title="Vocablos Registrados" value={stats.registeredWords} icon="library_books" variant="secondary" />
                <StatCard title="Audios por Revisar" value={stats.pendingAudios} icon="audio_file" variant="tertiary" />
                <StatCard title="Nuevas Variantes" value={stats.newVariants} icon="hub" variant="surface" />
            </div>

            {/* Contenido Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg relative z-10">
                
                {/* Columna Izquierda / Central */}
                <div className="lg:col-span-2 flex flex-col gap-lg">
                    
                    {/* Dialectos Activos */}
                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-lg">
                        <div className="flex justify-between items-center mb-md border-b border-outline-variant/30 pb-sm">
                            <h3 className="font-headline-md text-headline-md text-primary">Dialectos Activos</h3>
                            <button className="bg-primary text-on-primary font-label-lg text-label-lg rounded-lg py-2 px-4 flex items-center gap-xs border-press hover:bg-primary/90 transition-colors shadow-md">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Nueva Lengua
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-sm mb-md">
                            {languages.map((lang, index) => {
                                const isSelected = selectedLanguage === lang.name;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleLanguageSelect(lang.name)}
                                        className={`px-md py-1.5 rounded-full font-label-lg text-label-lg border transition-colors flex items-center gap-xs ${
                                            isSelected
                                                ? 'bg-secondary-container text-on-secondary-container border-secondary/20 hover:bg-secondary/20'
                                                : 'bg-surface-container-high text-on-surface-variant border-outline-variant/50 hover:bg-surface-variant'
                                        }`}
                                    >
                                        {lang.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Vocabulario Base Table */}
                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-lg border-b border-outline-variant/40 flex flex-wrap justify-between items-center gap-md bg-surface-container/30">
                            <div>
                                <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Vocabulario Base</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    {selectedLanguage 
                                        ? `Mostrando entradas para ${selectedLanguage}.` 
                                        : 'Mostrando entradas recientes de la base de datos.'}
                                </p>
                            </div>
                            <div className="flex gap-sm">
                                <form onSubmit={handleSearchSubmit} className="relative flex items-center w-64 h-10 rounded-lg bg-surface-container-lowest border-2 border-outline-variant focus-within:border-primary transition-colors px-2">
                                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant mr-2">search</span>
                                    <input 
                                        type="text"
                                        value={searchWord}
                                        onChange={(e) => setSearchWord(e.target.value)}
                                        placeholder="Buscar vocablo..." 
                                        className="w-full outline-none text-body-md font-body-md bg-transparent border-none focus:ring-0 p-0 text-on-surface"
                                    />
                                </form>
                                <button className="border-2 border-secondary text-secondary font-label-lg text-label-lg rounded-lg py-2 px-4 hover:bg-secondary/10 transition-colors flex items-center gap-xs shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Agregar Vocablo
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-lowest border-b-2 border-outline-variant/50">
                                        <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold">Vocablo (Origen)</th>
                                        <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold">Español</th>
                                        <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold">Variante</th>
                                        <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold">Estado Audio</th>
                                        <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant/30">
                                    {words.data && words.data.length > 0 ? (
                                        words.data.map((item) => (
                                            <tr key={item.id} className="hover:bg-surface-container-low transition-colors group">
                                                <td className="p-4 font-medium">{item.term}</td>
                                                <td className="p-4 text-on-surface-variant">{item.translation}</td>
                                                <td className="p-4">{item.variant}</td>
                                                <td className="p-4">
                                                    {item.audio_status === 'verified' && (
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary-container/50 text-secondary font-label-sm">
                                                            <span className="material-symbols-outlined text-[14px]">check_circle</span> Verificado
                                                        </span>
                                                    )}
                                                    {item.audio_status === 'pending' && (
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-tertiary-container/40 text-tertiary font-label-sm">
                                                            <span className="material-symbols-outlined text-[14px]">pending</span> Pendiente
                                                        </span>
                                                    )}
                                                    {item.audio_status === 'missing' && (
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-error-container/50 text-error font-label-sm">
                                                            <span className="material-symbols-outlined text-[14px]">error</span> Faltante
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button className="text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-4 text-center text-on-surface-variant">
                                                No se encontraron vocablos registrados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Columna Derecha / Paneles Secundarios */}
                <div className="lg:col-span-1 flex flex-col gap-lg">
                    
                    {/* Revisión de Audios */}
                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm flex flex-col max-h-[400px]">
                        <div className="p-md border-b border-outline-variant/30 bg-surface-container/30 sticky top-0">
                            <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-xs">
                                <span className="material-symbols-outlined text-tertiary">graphic_eq</span>
                                Revisión de Audios
                            </h3>
                        </div>
                        <div className="p-md flex-1 overflow-y-auto flex flex-col gap-md">
                            {audioReviews.length > 0 ? (
                                audioReviews.map((audio) => (
                                    <div key={audio.id} className="bg-surface-container p-sm rounded-lg border border-outline-variant/30 flex gap-sm items-start relative group">
                                        <button 
                                            onClick={() => new Audio(audio.audio_url).play()}
                                            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-sm"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="font-label-lg text-label-lg text-on-surface truncate">"{audio.word}"</p>
                                                <span className="font-label-sm text-label-sm text-on-surface-variant">{audio.duration}</span>
                                            </div>
                                            <p className="font-label-sm text-label-sm text-on-surface-variant truncate mb-2">Por: {audio.author}</p>
                                            <div className="flex gap-xs">
                                                <button 
                                                    onClick={() => handleAudioAction(audio.id, 'approve')}
                                                    className="flex-1 py-1 rounded border border-secondary text-secondary font-label-sm hover:bg-secondary/10 transition-colors"
                                                >
                                                    Aprobar
                                                </button>
                                                <button 
                                                    onClick={() => handleAudioAction(audio.id, 'reject')}
                                                    className="flex-1 py-1 rounded border border-outline-variant text-on-surface-variant font-label-sm hover:bg-surface-variant transition-colors"
                                                >
                                                    Rechazar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-on-surface-variant text-center py-4">Sin audios pendientes.</p>
                            )}
                        </div>
                    </div>

                    {/* Variantes Regionales */}
                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-lg">
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Variantes Regionales</h3>
                        <ul className="flex flex-col gap-sm">
                            {regionalVariants.map((variant) => (
                                <li key={variant.id} className="flex justify-between items-center p-sm rounded-lg hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant/20">
                                    <div>
                                        <p className="font-label-lg text-label-lg text-on-surface">{variant.name}</p>
                                        <p className="font-label-sm text-label-sm text-on-surface-variant">{variant.count_label}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full font-label-sm ${
                                        variant.status === 'active' 
                                            ? 'bg-secondary-container text-on-secondary-container' 
                                            : 'bg-tertiary-container/40 text-tertiary'
                                    }`}>
                                        {variant.status_label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-md py-2 border-2 border-dashed border-outline-variant rounded-lg text-on-surface-variant font-label-lg hover:border-primary hover:text-primary transition-colors flex justify-center items-center gap-xs">
                            <span className="material-symbols-outlined text-[18px]">add</span> Añadir Variante
                        </button>
                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}