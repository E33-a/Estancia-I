import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import TeacherSidebar from '@/Components/Teacher/Sidebar';
import TeacherTopbar from '@/Components/Teacher/Topbar';

export default function Dashboard({ 
    teacherProfile = null, 
    groups = [], 
    students = [], 
    assignedActivitiesCount = 0, 
    groupAverage = 'N/A',
    announcements = []
}) {
    // Estado para controlar si el sidebar está abierto o colapsado
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <Head title="Panel Docente - Raíces Vivas" />

            {/* Fuentes de Google Fonts y Material Symbols */}
            <link 
                href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" 
                rel="stylesheet" 
            />
            <link 
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" 
                rel="stylesheet" 
            />

            {/* Estilos dinámicos personalizados */}
            <style>{`
                .otomi-pattern {
                    opacity: 0.04;
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l-20-20l-10 10l30 30l30-30l-10-10z' fill='%239a4028'/%3E%3C/svg%3E");
                }
                .sunset-shadow {
                    box-shadow: 0 12px 32px -8px rgba(154, 64, 40, 0.12);
                }
                .border-press:active {
                    transform: translateY(2px);
                }
                .mayan-divider {
                    border-bottom: 2px solid;
                    border-image: repeating-linear-gradient(45deg, #9a4028, #9a4028 10px, transparent 10px, transparent 20px) 1;
                }
            `}</style>

            <div className="font-body-md text-on-surface bg-surface min-h-screen flex">
                
                {/* SIDEBAR NAVIGATION (Pasamos el estado e isSidebarOpen) */}
                <TeacherSidebar 
                    teacherProfile={teacherProfile} 
                    isOpen={isSidebarOpen} 
                    toggleSidebar={toggleSidebar} 
                />

                {/* ÁREA DE CONTENIDO PRINCIPAL (Transición dinámica de margen) */}
                <div className={`flex-1 flex flex-col min-h-screen relative overflow-x-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                    <div className="absolute inset-0 otomi-pattern pointer-events-none"></div>

                    {/* TOP APP BAR (Pasamos toggleSidebar por si quieres el botón arriba también) */}
                    <TeacherTopbar groups={groups} toggleSidebar={toggleSidebar} />

                    {/* LIENZO DE CONTENIDO */}
                    <main className="p-8 relative z-10 max-w-7xl w-full mx-auto space-y-8 flex-grow">
                        
                        {/* MÉTRICAS BENTO GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Estudiantes Activos */}
                            <div className="bg-white p-6 rounded-xl sunset-shadow border border-outline-variant/20 flex items-center gap-6 relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                    <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                                </div>
                                <div>
                                    <p className="font-label-lg text-label-lg text-on-surface-variant">Estudiantes Activos</p>
                                    <h3 className="font-headline-lg text-headline-lg text-secondary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        {students.length}
                                    </h3>
                                </div>
                            </div>

                            {/* Actividades Asignadas */}
                            <div className="bg-white p-6 rounded-xl sunset-shadow border border-outline-variant/20 flex items-center gap-6 relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                    <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>assignment</span>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>assignment</span>
                                </div>
                                <div>
                                    <p className="font-label-lg text-label-lg text-on-surface-variant">Actividades Asignadas</p>
                                    <h3 className="font-headline-lg text-headline-lg text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        {assignedActivitiesCount}
                                    </h3>
                                </div>
                            </div>

                            {/* Promedio Grupal */}
                            <div className="bg-white p-6 rounded-xl sunset-shadow border border-outline-variant/20 flex items-center gap-6 relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                    <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-tertiary-container flex items-center justify-center text-on-tertiary">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                </div>
                                <div>
                                    <p className="font-label-lg text-label-lg text-on-surface-variant">Promedio Grupal</p>
                                    <h3 className="font-headline-lg text-headline-lg text-tertiary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        {groupAverage}
                                    </h3>
                                </div>
                            </div>

                        </div>

                        {/* ÁREA INTERACTIVA PRINCIPAL */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            
                            {/* Tabla de Actividad Reciente */}
                            <div className="lg:col-span-3 space-y-4">
                                <div className="flex items-center justify-between mayan-divider pb-2">
                                    <h3 className="font-headline-md text-headline-md text-on-surface" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        Recent Class Activity
                                    </h3>
                                    <Link className="text-primary font-label-lg text-label-lg hover:underline" href="#">
                                        View All Students
                                    </Link>
                                </div>

                                <div className="bg-white rounded-xl sunset-shadow overflow-hidden border border-outline-variant/10">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-surface-container-low">
                                            <tr>
                                                <th className="p-4 font-label-lg text-on-surface-variant">Estudiante</th>
                                                <th className="p-4 font-label-lg text-on-surface-variant">Última Actividad</th>
                                                <th className="p-4 font-label-lg text-on-surface-variant">Progreso</th>
                                                <th className="p-4 font-label-lg text-on-surface-variant">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-outline-variant/10 font-body-md">
                                            {students.length > 0 ? (
                                                students.map((student) => (
                                                    <tr key={student.id} className="hover:bg-surface-container/30 transition-colors">
                                                        <td className="p-4 font-medium">{student.name}</td>
                                                        <td className="p-4 text-on-surface-variant">{student.last_activity || 'Sin actividad'}</td>
                                                        <td className="p-4">{student.progress || 0}%</td>
                                                        <td className="p-4">
                                                            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
                                                                {student.status || 'Pendiente'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="p-8 text-center text-on-surface-variant">
                                                        <span className="material-symbols-outlined text-4xl mb-2 text-outline">group_off</span>
                                                        <p>No hay estudiantes ni actividad registrada en este momento.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Panel Lateral Secundario */}
                            <div className="space-y-4">
                                <div className="bg-white p-6 rounded-xl sunset-shadow border border-outline-variant/20">
                                    <h4 className="font-headline-md text-headline-md text-primary mb-4" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        Avisos Rápidos
                                    </h4>
                                    {announcements.length > 0 ? (
                                        <ul className="space-y-3">
                                            {announcements.map((item, idx) => (
                                                <li key={idx} className="text-body-md text-on-surface-variant">
                                                    {item.text}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-body-md text-on-surface-variant italic">
                                            No hay avisos recientes.
                                        </p>
                                    )}
                                </div>
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