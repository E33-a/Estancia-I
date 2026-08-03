import { Head, Link, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function Dashboard({ 
    teacherProfile = null, 
    groups = [], 
    students = [], 
    assignedActivitiesCount = 0, 
    groupAverage = 'N/A',
    announcements = []
}) {
    // Obtenemos el usuario autenticado desde Inertia
    const { auth } = usePage().props;
    const user = auth?.user;

    // Datos dinámicos del docente
    const teacherData = teacherProfile || user?.teacher_profile || {};

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
                
                {/* SIDEBAR NAVIGATION (Fija a la izquierda) */}
                <aside className="h-screen w-64 fixed left-0 top-0 bg-surface shadow-md flex flex-col border-r border-outline-variant/30 z-50">
                    {/* Brand Header */}
                    <div className="px-6 py-8 border-b border-outline-variant/20">
                        <h1 className="font-headline-md text-headline-md font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                            Raíces Vivas
                        </h1>
                        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                            Educator Console
                        </p>
                    </div>

                    {/* Perfil del docente */}
                    <div className="px-4 py-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <div>
                            <p className="font-label-lg text-label-lg text-on-surface font-semibold">
                                {user?.name || 'Docente'}
                            </p>
                            <p className="text-[10px] text-on-surface-variant">
                                ID: {teacherData.teacher_id || 'Sin ID'}
                            </p>
                        </div>
                    </div>

                    {/* Navegación Principal */}
                    <nav className="flex-1 px-3 space-y-1 mt-2">
                        <Link 
                            href="#" 
                            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200 rounded-lg group"
                        >
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">library_books</span>
                            <span className="font-label-lg text-label-lg">Content Management</span>
                        </Link>
                        <Link 
                            href="#" 
                            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200 rounded-lg group"
                        >
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">assignment_turned_in</span>
                            <span className="font-label-lg text-label-lg">Task Assignment</span>
                        </Link>
                        <Link 
                            href="#" 
                            className="flex items-center gap-3 px-4 py-3 text-primary font-bold border-r-4 border-primary bg-primary-container/10 rounded-l-lg group"
                        >
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="font-label-lg text-label-lg">Reports</span>
                        </Link>
                        <Link 
                            href="#" 
                            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200 rounded-lg group"
                        >
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">quiz</span>
                            <span className="font-label-lg text-label-lg">Assessments</span>
                        </Link>
                    </nav>

                    {/* Acciones del pie de la Sidebar */}
                    <div className="p-6 mt-auto space-y-4">
                        <button className="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg border-b-4 border-primary-container hover:bg-primary-container transition-all border-press flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">add_circle</span>
                            Create New Class
                        </button>
                        <div className="border-t border-outline-variant/30 pt-4 space-y-1">
                            <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-md">settings</span>
                                <span className="font-label-sm text-label-sm">Settings</span>
                            </Link>
                            <Link 
                                method="post" 
                                href={route('logout')} 
                                as="button" 
                                className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error-container/20 rounded-lg transition-colors text-left"
                            >
                                <span className="material-symbols-outlined text-md">logout</span>
                                <span className="font-label-sm text-label-sm">Salir</span>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* ÁREA DE CONTENIDO PRINCIPAL */}
                <div className="ml-64 flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
                    <div className="absolute inset-0 otomi-pattern pointer-events-none"></div>

                    {/* TOP APP BAR */}
                    <header className="flex justify-between items-center w-full px-6 py-4 bg-surface shadow-sm sticky top-0 z-40">
                        <div className="flex items-center gap-3">
                            <h2 className="font-headline-md text-headline-md font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                Raíces Vivas Control Center
                            </h2>
                            <div className="h-6 w-[1px] bg-outline-variant/50 mx-2"></div>
                            <div className="relative">
                                <select 
                                    defaultValue=""
                                    className="bg-surface-container-low border-2 border-outline-variant rounded-lg font-label-lg text-label-lg px-4 py-2 pr-10 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer text-on-surface"
                                >
                                    <option value="" disabled>Seleccionar grupo...</option>
                                    {groups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                    expand_more
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Buscador corregido en padding e icono */}
                            <div className="relative flex items-center">
                                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant pointer-events-none text-xl">
                                    search
                                </span>
                                <input 
                                    type="text"
                                    placeholder="Search data..." 
                                    className="bg-surface-container-lowest border-2 border-outline-variant/30 rounded-full py-2 pl-10 pr-4 focus:border-primary focus:ring-0 text-body-md w-64 transition-all outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="relative p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full">
                                    <span className="material-symbols-outlined">notifications</span>
                                </button>
                                <Link href={route('profile.edit')} className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full">
                                    <span className="material-symbols-outlined">account_circle</span>
                                </Link>
                            </div>
                        </div>
                    </header>

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