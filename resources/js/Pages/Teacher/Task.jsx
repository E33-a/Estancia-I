import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Teacher/Sidebar';
import Topbar from '@/Components/Teacher/Topbar';

export default function Task({ 
    lessons = [], 
    groups = [], 
    pendingSubmissions = [], 
    teacherProfile = null 
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        lesson_id: '',
        group_id: '',
        due_date: '',
        points: '',
        instructions: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teacher.tasks.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Raíces Vivas - Asignación de Tareas" />

            <div className="bg-background text-on-background font-body-md min-h-screen flex antialiased bg-watermark">
                {/* SIDEBAR REUTILIZADO */}
                <Sidebar 
                    teacherProfile={teacherProfile} 
                    isOpen={isSidebarOpen} 
                    toggleSidebar={toggleSidebar} 
                />

                {/* CONTENIDO PRINCIPAL */}
                <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                    
                    {/* TOPBAR REUTILIZADO */}
                    <Topbar groups={groups} toggleSidebar={toggleSidebar} />

                    {/* MAIN CANVAS */}
                    <main className="flex-1 p-margin-mobile md:p-margin-tablet max-w-6xl mx-auto w-full flex flex-col gap-xl">
                        {/* Header de la página */}
                        <div className="flex flex-col gap-xs">
                            <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-background">
                                Asignación de Tareas
                            </h2>
                            <p className="font-body-lg text-on-surface-variant max-w-2xl">
                                Asigna materiales y actividades a tus grupos y realiza el seguimiento de entregas.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
                            
                            {/* Columna Izquierda: Formulario */}
                            <div className="lg:col-span-5 flex flex-col gap-md">
                                <div className="bg-surface-container-lowest rounded-xl p-lg shadow-level-1 border border-outline-variant relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-50"></div>
                                    <h3 className="font-headline-md text-primary mb-md">Nueva Asignación</h3>
                                    
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                                        
                                        {/* Selector de Lección */}
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-lg text-on-surface">Seleccionar Lección</label>
                                            <div className="relative">
                                                <select 
                                                    value={data.lesson_id}
                                                    onChange={e => setData('lesson_id', e.target.value)}
                                                    className="w-full appearance-none bg-surface border-2 border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-0 transition-colors"
                                                >
                                                    <option value="" disabled>Elige una lección del CMS...</option>
                                                    {lessons.map((lesson) => (
                                                        <option key={lesson.id} value={lesson.id}>
                                                            {lesson.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                                                    expand_more
                                                </span>
                                            </div>
                                            {errors.lesson_id && <span className="text-error text-label-sm">{errors.lesson_id}</span>}
                                        </div>

                                        {/* Selector de Grupo */}
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-lg text-on-surface">Grupo o Estudiantes</label>
                                            <div className="relative">
                                                <select 
                                                    value={data.group_id}
                                                    onChange={e => setData('group_id', e.target.value)}
                                                    className="w-full appearance-none bg-surface border-2 border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-0 transition-colors"
                                                >
                                                    <option value="" disabled>Selecciona a quién asignar...</option>
                                                    {groups.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                                                    expand_more
                                                </span>
                                            </div>
                                            {errors.group_id && <span className="text-error text-label-sm">{errors.group_id}</span>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-md">
                                            {/* Fecha Límite */}
                                            <div className="flex flex-col gap-xs">
                                                <label className="font-label-lg text-on-surface">Fecha Límite</label>
                                                <input 
                                                    type="date"
                                                    value={data.due_date}
                                                    onChange={e => setData('due_date', e.target.value)}
                                                    className="w-full bg-surface border-2 border-outline-variant rounded-lg px-3 py-3 font-body-md text-on-surface focus:border-primary focus:ring-0 transition-colors"
                                                />
                                                {errors.due_date && <span className="text-error text-label-sm">{errors.due_date}</span>}
                                            </div>

                                            {/* Puntos */}
                                            <div className="flex flex-col gap-xs">
                                                <label className="font-label-lg text-on-surface">Valor en Puntos</label>
                                                <div className="relative">
                                                    <input 
                                                        type="number"
                                                        placeholder="100"
                                                        value={data.points}
                                                        onChange={e => setData('points', e.target.value)}
                                                        className="w-full bg-surface border-2 border-outline-variant rounded-lg pl-3 pr-10 py-3 font-body-md text-on-surface focus:border-primary focus:ring-0 transition-colors"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-label-sm text-on-surface-variant">
                                                        pts
                                                    </span>
                                                </div>
                                                {errors.points && <span className="text-error text-label-sm">{errors.points}</span>}
                                            </div>
                                        </div>

                                        {/* Instrucciones */}
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-lg text-on-surface">Instrucciones Adicionales (Opcional)</label>
                                            <textarea 
                                                rows="3"
                                                placeholder="Añade notas para tus estudiantes..."
                                                value={data.instructions}
                                                onChange={e => setData('instructions', e.target.value)}
                                                className="w-full bg-surface border-2 border-outline-variant rounded-lg px-3 py-2 font-body-md text-on-surface focus:border-primary focus:ring-0 transition-colors resize-none"
                                            ></textarea>
                                        </div>

                                        {/* Botón Guardar */}
                                        <button 
                                            type="submit"
                                            disabled={processing}
                                            className="mt-md w-full bg-primary text-on-primary font-label-lg text-label-lg py-3 px-md rounded-lg shadow-level-1 border-press border-primary-container hover:bg-primary-container transition-all active:scale-95 flex justify-center items-center gap-sm disabled:opacity-50"
                                        >
                                            <span className="material-symbols-outlined">send</span>
                                            <span>Asignar Actividad</span>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Columna Derecha: Tabla de Entregas */}
                            <div className="lg:col-span-7 flex flex-col gap-md">
                                <div className="bg-surface-container-lowest rounded-xl p-lg shadow-level-1 border border-outline-variant h-full flex flex-col">
                                    <div className="flex justify-between items-center mb-lg">
                                        <h3 className="font-headline-md text-primary">Entregas Pendientes por Revisar</h3>
                                        <button className="text-secondary hover:text-on-secondary-container flex items-center gap-1 font-label-sm transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                            Filtrar
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-x-auto">
                                        <div className="min-w-[500px]">
                                            <div className="grid grid-cols-12 gap-sm pb-sm border-b-2 border-outline-variant mb-sm px-sm">
                                                <div className="col-span-4 font-label-sm text-on-surface-variant uppercase tracking-wider">Estudiante</div>
                                                <div className="col-span-4 font-label-sm text-on-surface-variant uppercase tracking-wider">Actividad</div>
                                                <div className="col-span-2 font-label-sm text-on-surface-variant uppercase tracking-wider">Fecha</div>
                                                <div className="col-span-2 text-right font-label-sm text-on-surface-variant uppercase tracking-wider">Acción</div>
                                            </div>

                                            <div className="flex flex-col gap-sm">
                                                {pendingSubmissions.map((item) => (
                                                    <div key={item.id} className="grid grid-cols-12 gap-sm items-center py-sm px-sm bg-surface rounded-lg border border-transparent hover:border-outline-variant hover:bg-surface-container-high transition-colors">
                                                        <div className="col-span-4 flex items-center gap-sm">
                                                            <div className={`w-8 h-8 rounded-full ${item.color_bg} ${item.color_text} flex items-center justify-center font-label-lg font-bold`}>
                                                                {item.initials}
                                                            </div>
                                                            <span className="font-body-md font-medium text-on-surface truncate">{item.student}</span>
                                                        </div>
                                                        <div className="col-span-4 font-body-md text-on-surface-variant truncate">
                                                            {item.activity}
                                                        </div>
                                                        <div className="col-span-2 font-label-sm text-on-surface-variant">
                                                            {item.date}
                                                        </div>
                                                        <div className="col-span-2 flex justify-end">
                                                            <button className="px-3 py-1.5 border border-secondary text-secondary rounded-lg font-label-sm hover:bg-secondary hover:text-on-secondary transition-colors whitespace-nowrap">
                                                                Revisar
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-md pt-md border-t border-outline-variant flex justify-center">
                                        <button className="text-primary font-label-lg hover:underline decoration-2 underline-offset-4">
                                            Ver todas las entregas
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}