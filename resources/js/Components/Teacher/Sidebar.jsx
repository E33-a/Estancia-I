import { Link, usePage } from '@inertiajs/react';

export default function Sidebar({ teacherProfile = null, isOpen = true, toggleSidebar }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const teacherData = teacherProfile || user?.teacher_profile || {};

    // Helper seguro para obtener la URL de una ruta
    const getRouteUrl = (routeName) => {
        return typeof route !== 'undefined' && route().has(routeName) 
            ? route(routeName) 
            : '#';
    };

    // Helper seguro para verificar si una ruta está activa
    const isCurrentRoute = (routeName) => {
        return typeof route !== 'undefined' && route().has(routeName) && route().current(routeName);
    };

    return (
        <aside className={`h-screen fixed left-0 top-0 bg-surface shadow-md flex flex-col border-r border-outline-variant/30 z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            
            {/* Header / Brand & Toggle Button */}
            <div className="px-4 py-6 border-b border-outline-variant/20 flex items-center justify-between">
                {isOpen ? (
                    <div>
                        <h1 className="font-headline-md text-headline-md font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                            Raíces Vivas
                        </h1>
                        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                            Educator Console
                        </p>
                    </div>
                ) : (
                    <span className="material-symbols-outlined text-primary text-2xl mx-auto">forest</span>
                )}
                
                <button 
                    onClick={toggleSidebar} 
                    className="p-1 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
                    title={isOpen ? "Colapsar menú" : "Expandir menú"}
                >
                    <span className="material-symbols-outlined">
                        {isOpen ? 'chevron_left' : 'chevron_right'}
                    </span>
                </button>
            </div>

            {/* Perfil del docente */}
            <div className={`py-6 flex items-center ${isOpen ? 'px-4 gap-3' : 'justify-center px-2'}`}>
                <div className="w-10 h-10 min-w-[40px] rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined">person</span>
                </div>
                {isOpen && (
                    <div className="overflow-hidden">
                        <p className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                            {user?.name || 'Docente'}
                        </p>
                        <p className="text-[10px] text-on-surface-variant truncate">
                            ID: {teacherData.teacher_id || 'Sin ID'}
                        </p>
                    </div>
                )}
            </div>

            {/* Navegación Principal */}
            <nav className="flex-1 px-3 space-y-1 mt-2">
                
                {/* Content Management */}
                <Link
                    href={getRouteUrl('teacher.content-management')}
                    title={!isOpen ? "Content Management" : ""}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                        isCurrentRoute('teacher.content-management') 
                            ? 'bg-primary-container/10 text-primary font-bold border-r-4 border-primary' 
                            : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                    } ${!isOpen && 'justify-center border-r-0 px-0'}`}
                >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">edit_document</span>
                    {isOpen && <span className="font-label-lg text-label-lg whitespace-nowrap">Content Management</span>}
                </Link>

                {/* Task Assignment */}
                <Link 
                    href={getRouteUrl('teacher.tasks')} 
                    title={!isOpen ? "Task Assignment" : ""}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                        isCurrentRoute('teacher.tasks') 
                            ? 'bg-primary-container/10 text-primary font-bold border-r-4 border-primary' 
                            : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                    } ${!isOpen && 'justify-center border-r-0 px-0'}`}
                >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">assignment_turned_in</span>
                    {isOpen && <span className="font-label-lg text-label-lg whitespace-nowrap">Task Assignment</span>}
                </Link>

                {/* Reports / Dashboard */}
                <Link 
                    href={getRouteUrl('teacher.dashboard')} 
                    title={!isOpen ? "Reports" : ""}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                        isCurrentRoute('teacher.dashboard')
                            ? 'bg-primary-container/10 text-primary font-bold border-r-4 border-primary'
                            : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                    } ${!isOpen && 'justify-center border-r-0 px-0'}`}
                >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">analytics</span>
                    {isOpen && <span className="font-label-lg text-label-lg whitespace-nowrap">Reports</span>}
                </Link>

                {/* Assessments */}
                <Link 
                    href={getRouteUrl('teacher.assessments')} 
                    title={!isOpen ? "Assessments" : ""}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                        isCurrentRoute('teacher.assessments') 
                            ? 'bg-primary-container/10 text-primary font-bold border-r-4 border-primary' 
                            : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                    } ${!isOpen && 'justify-center border-r-0 px-0'}`}
                >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">quiz</span>
                    {isOpen && <span className="font-label-lg text-label-lg whitespace-nowrap">Assessments</span>}
                </Link>
            </nav>

            {/* Acciones del pie de la Sidebar */}
            <div className="p-4 mt-auto space-y-4">
                <button 
                    title={!isOpen ? "Create New Class" : ""}
                    className={`w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg border-b-4 border-primary-container hover:bg-primary-container transition-all border-press flex items-center justify-center gap-2 ${isOpen ? 'px-4' : 'px-0'}`}
                >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    {isOpen && <span>Create New Class</span>}
                </button>
                
                <div className="border-t border-outline-variant/30 pt-4 space-y-1">
                    <Link 
                        href={getRouteUrl('profile.edit')} 
                        title={!isOpen ? "Settings" : ""}
                        className={`flex items-center gap-3 py-2 text-on-surface-variant hover:text-primary transition-colors ${isOpen ? 'px-4' : 'justify-center'}`}
                    >
                        <span className="material-symbols-outlined text-md">settings</span>
                        {isOpen && <span className="font-label-sm text-label-sm">Settings</span>}
                    </Link>

                    <Link 
                        method="post" 
                        href={getRouteUrl('logout')} 
                        as="button" 
                        title={!isOpen ? "Salir" : ""}
                        className={`w-full flex items-center gap-3 py-2 text-error hover:bg-error-container/20 rounded-lg transition-colors ${isOpen ? 'px-4 text-left' : 'justify-center'}`}
                    >
                        <span className="material-symbols-outlined text-md">logout</span>
                        {isOpen && <span className="font-label-sm text-label-sm">Salir</span>}
                    </Link>
                </div>
            </div>
        </aside>
    );
}