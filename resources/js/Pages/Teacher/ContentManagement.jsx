import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Sidebar from '@/Components/Teacher/Sidebar';
import Topbar from '@/Components/Teacher/Topbar';

export default function ContentManagement({ 
    teacherProfile = null, 
    groups = [],
    savedResources = []
}) {
    // Estado para controlar la apertura y colapso del menú lateral
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    // Estado para seleccionar el nivel de dificultad
    const [level, setLevel] = useState('Principiante');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <Head title="Gestión de Contenido - Raíces Vivas" />

            {/* Fuentes de Google Fonts y Material Symbols */}
            <link 
                href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" 
                rel="stylesheet" 
            />
            <link 
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" 
                rel="stylesheet" 
            />

            <div className="font-body-md text-on-surface bg-background min-h-screen flex">
                
                {/* SIDEBAR REUTILIZADO */}
                <Sidebar 
                    teacherProfile={teacherProfile} 
                    isOpen={isSidebarOpen} 
                    toggleSidebar={toggleSidebar} 
                />

                {/* CONTENIDO PRINCIPAL (Adaptable al ancho de la Sidebar) */}
                <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                    
                    {/* TOPBAR REUTILIZADO */}
                    <Topbar groups={groups} toggleSidebar={toggleSidebar} />

                    {/* CANVAS / CONTENIDO DE LA PÁGINA */}
                    <main className="flex-1 p-6 md:p-10 bg-background overflow-y-auto">
                        
                        {/* Page Header */}
                        <div className="mb-8">
                            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-1" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                Content Management
                            </h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant">
                                Create and manage culturally resonant educational materials.
                            </p>
                        </div>

                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* Left Column: Formulario de Creación */}
                            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                                <section className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary opacity-20"></div>
                                    <h3 className="font-headline-md text-headline-md text-on-surface mb-6" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        Create New Material
                                    </h3>
                                    
                                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                                        {/* Basic Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-1">
                                                <label className="font-label-lg text-label-lg text-on-surface-variant">Title</label>
                                                <input 
                                                    type="text" 
                                                    className="border-2 border-outline-variant rounded-lg p-3 focus:border-primary focus:ring-0 font-body-md text-on-surface outline-none transition-colors bg-transparent" 
                                                    placeholder="e.g., La Leyenda del Maíz" 
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="font-label-lg text-label-lg text-on-surface-variant">Language</label>
                                                <select className="border-2 border-outline-variant rounded-lg p-3 focus:border-primary focus:ring-0 font-body-md text-on-surface outline-none transition-colors bg-transparent">
                                                    <option>Náhuatl</option>
                                                    <option>Otomí</option>
                                                    <option>Zapoteco</option>
                                                    <option>Maya</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Category & Level */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-1">
                                                <label className="font-label-lg text-label-lg text-on-surface-variant">Category</label>
                                                <select className="border-2 border-outline-variant rounded-lg p-3 focus:border-primary focus:ring-0 font-body-md text-on-surface outline-none transition-colors bg-transparent">
                                                    <option>Vocabulary</option>
                                                    <option>Grammar</option>
                                                    <option>Storytelling</option>
                                                    <option>Cultural Insight</option>
                                                </select>
                                            </div>
                                            
                                            <div className="flex flex-col gap-1">
                                                <label className="font-label-lg text-label-lg text-on-surface-variant">Proficiency Level</label>
                                                <div className="flex bg-surface-container-high rounded-lg p-1 gap-1">
                                                    {['Principiante', 'Intermedio', 'Avanzado'].map((lvl) => (
                                                        <button 
                                                            key={lvl}
                                                            type="button" 
                                                            onClick={() => setLevel(lvl)}
                                                            className={`flex-1 font-label-lg text-label-lg py-1.5 rounded-md transition-colors ${
                                                                level === lvl 
                                                                    ? 'bg-surface-container-lowest text-primary shadow-sm border border-outline-variant' 
                                                                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                                                            }`}
                                                        >
                                                            {lvl}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bilingual Editor */}
                                        <div className="flex flex-col gap-1">
                                            <label className="font-label-lg text-label-lg text-on-surface-variant mb-1">Bilingual Content</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex flex-col">
                                                    <span className="font-label-sm text-label-sm text-primary mb-2 bg-primary-container/20 w-max px-3 py-1 rounded-full font-semibold">
                                                        Español
                                                    </span>
                                                    <textarea 
                                                        className="border-2 border-outline-variant rounded-lg p-3 focus:border-primary focus:ring-0 font-body-md text-on-surface outline-none transition-colors bg-transparent resize-y" 
                                                        placeholder="Escribe el texto en español..." 
                                                        rows="5"
                                                    ></textarea>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-sm text-label-sm text-secondary mb-2 bg-secondary-container/40 w-max px-3 py-1 rounded-full font-semibold">
                                                        Lengua Originaria
                                                    </span>
                                                    <textarea 
                                                        className="border-2 border-outline-variant rounded-lg p-3 focus:border-primary focus:ring-0 font-body-md text-on-surface outline-none transition-colors bg-transparent resize-y" 
                                                        placeholder="Escribe la traducción..." 
                                                        rows="5"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Multimedia Upload */}
                                        <div className="flex flex-col gap-1">
                                            <label className="font-label-lg text-label-lg text-on-surface-variant">Multimedia Assets</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-high transition-colors bg-surface-container-lowest">
                                                    <span className="material-symbols-outlined text-outline text-3xl mb-1">image</span>
                                                    <span className="font-label-lg text-label-lg text-primary">Upload Image</span>
                                                    <span className="font-label-sm text-label-sm text-outline mt-1">JPG, PNG (Max 5MB)</span>
                                                </div>
                                                <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-high transition-colors bg-surface-container-lowest">
                                                    <span className="material-symbols-outlined text-outline text-3xl mb-1">mic</span>
                                                    <span className="font-label-lg text-label-lg text-primary">Upload Pronunciation</span>
                                                    <span className="font-label-sm text-label-sm text-outline mt-1">MP3, WAV (Max 10MB)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-end gap-3 mt-4">
                                            <button 
                                                type="button" 
                                                className="px-6 py-2.5 font-label-lg text-label-lg text-primary border-2 border-outline-variant rounded-lg hover:bg-surface-container-highest transition-colors"
                                            >
                                                Save Draft
                                            </button>
                                            <button 
                                                type="button" 
                                                className="px-6 py-2.5 font-label-lg text-label-lg text-on-primary bg-primary rounded-lg hover:bg-primary-container transition-all shadow-sm active:translate-y-[2px]"
                                            >
                                                Publish Material
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            </div>

                            {/* Right Column: Recursos Guardados */}
                            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                                <section className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm h-full flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-headline-md text-headline-md text-on-surface" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                            Recursos Guardados
                                        </h3>
                                        <button className="text-primary hover:bg-surface-container-high p-2 rounded-full transition-colors">
                                            <span className="material-symbols-outlined">filter_list</span>
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-3 overflow-y-auto max-h-[600px] pr-1 flex-grow">
                                        {savedResources.length === 0 ? (
                                            <p className="font-body-md text-on-surface-variant text-center py-6">
                                                No hay recursos guardados aún.
                                            </p>
                                        ) : (
                                            savedResources.map((item) => (
                                                <div 
                                                    key={item.id} 
                                                    className="p-3 border border-outline-variant/60 rounded-lg flex items-center justify-between hover:bg-surface-container-low transition-colors group"
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-label-lg text-label-lg text-on-surface">{item.title}</span>
                                                        <div className="flex gap-2 items-center">
                                                            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-sm">
                                                                {item.language}
                                                            </span>
                                                            <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full ${
                                                                item.status === 'Publicado' 
                                                                    ? 'bg-secondary-container text-on-secondary-container font-semibold' 
                                                                    : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                                                            }`}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-outline hover:text-primary p-1.5 rounded-full transition-colors" title="Editar">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button className="text-outline hover:text-error p-1.5 rounded-full transition-colors" title="Eliminar">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </section>
                            </div>

                        </div>
                    </main>

                    {/* FOOTER */}
                    <Footer />
                </div>
            </div>
        </>
    );
}