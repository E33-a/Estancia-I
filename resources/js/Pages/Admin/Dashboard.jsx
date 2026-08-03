import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ 
    stats = { totalUsers: 0, activeTeachers: 0, students: 0, serverUptime: '0%' }, 
    recentUsers = [],
    systemMetrics = { cpu: 0, ram: 0 }
}) {
    // Datos globales de Inertia
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            <Head title="Panel de Administración - Raíces Vivas" />

            {/* Google Fonts y Material Symbols */}
            <link 
                href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" 
                rel="stylesheet" 
            />
            <link 
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" 
                rel="stylesheet" 
            />

            {/* Estilos dinámicos locales */}
            <style>{`
                .otomi-pattern {
                    opacity: 0.04;
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l-20-20l-10 10l30 30l30-30l-10-10z' fill='%239a4028'/%3E%3C/svg%3E");
                }
                .sunset-shadow {
                    box-shadow: 0 12px 32px -8px rgba(154, 64, 40, 0.12);
                }
                .sunset-shadow-lg {
                    box-shadow: 0 20px 40px -12px rgba(154, 64, 40, 0.25);
                }
                .border-press:active {
                    transform: translateY(2px);
                }
            `}</style>

            <div className="bg-surface font-body-md text-on-surface min-h-screen flex relative overflow-x-hidden">
                
                {/* SIDEBAR NAVIGATION */}
                <aside className="fixed left-0 top-0 h-screen w-72 flex flex-col z-40 bg-surface dark:bg-inverse-surface shadow-sm p-lg transition-all duration-300">
                    <div className="mb-xl px-sm">
                        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary leading-tight">
                            Raíces Vivas
                        </h1>
                        <p className="font-label-lg text-label-lg text-on-surface-variant opacity-70">
                            System Administrator
                        </p>
                    </div>

                    <nav className="flex-1 flex flex-col gap-xs overflow-y-auto">
                        <Link 
                            href="#" 
                            className="flex items-center gap-md p-md rounded-lg text-primary dark:text-inverse-primary font-bold border-l-4 border-primary dark:border-inverse-primary bg-primary-container/10 transition-colors duration-200"
                        >
                            <span className="material-symbols-outlined">leaderboard</span>
                            <span className="font-label-lg text-label-lg">Analytics</span>
                        </Link>
                        <Link 
                            href="#" 
                            className="flex items-center gap-md p-md rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container transition-colors duration-200"
                        >
                            <span className="material-symbols-outlined">manage_accounts</span>
                            <span className="font-label-lg text-label-lg">User Control</span>
                        </Link>
                        <Link 
                            href="#" 
                            className="flex items-center gap-md p-md rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container transition-colors duration-200"
                        >
                            <span className="material-symbols-outlined">school</span>
                            <span className="font-label-lg text-label-lg">Educator Matrix</span>
                        </Link>
                        <Link 
                            href="#" 
                            className="flex items-center gap-md p-md rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container transition-colors duration-200"
                        >
                            <span className="material-symbols-outlined">translate</span>
                            <span className="font-label-lg text-label-lg">Linguistic Data</span>
                        </Link>
                        <Link 
                            href="#" 
                            className="flex items-center gap-md p-md rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container transition-colors duration-200"
                        >
                            <span className="material-symbols-outlined">settings_heart</span>
                            <span className="font-label-lg text-label-lg">System Health</span>
                        </Link>
                    </nav>

                    <div className="mt-auto border-t border-outline-variant pt-lg flex flex-col gap-xs">
                        <button className="w-full bg-error text-on-error flex items-center justify-center gap-sm py-md rounded-xl font-bold border-press mb-md transition-transform active:scale-95">
                            <span className="material-symbols-outlined">lock</span>
                            <span className="font-label-lg text-label-lg">Emergency Lock</span>
                        </button>
                        <Link href="#" className="flex items-center gap-md p-md rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200">
                            <span className="material-symbols-outlined">history</span>
                            <span className="font-label-lg text-label-lg">Logs</span>
                        </Link>
                        <Link 
                            method="post" 
                            href={route('logout')} 
                            as="button" 
                            className="w-full flex items-center gap-md p-md rounded-lg text-on-surface-variant hover:bg-error-container/20 hover:text-error transition-colors duration-200 text-left"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            <span className="font-label-lg text-label-lg">Log Out</span>
                        </Link>
                    </div>
                </aside>

                {/* MAIN CONTENT WRAPPER */}
                <div className="ml-72 flex-1 min-h-screen relative flex flex-col">
                    
                    {/* TOP APP BAR */}
                    <header className="flex justify-between items-center w-full px-xl h-16 sticky top-0 z-30 bg-surface-bright border-b border-outline-variant">
                        <div className="flex items-center gap-md">
                            <span className="font-headline-md text-headline-md font-bold text-primary">
                                Raíces Vivas Admin
                            </span>
                        </div>
                        <div className="flex items-center gap-lg">
                            <div className="relative hidden lg:block">
                                <input 
                                    type="text" 
                                    placeholder="Buscar registros..." 
                                    className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-primary w-64"
                                />
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                                    search
                                </span>
                            </div>
                            <div className="flex items-center gap-sm">
                                <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors relative">
                                    <span className="material-symbols-outlined">notifications</span>
                                </button>
                                <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                                    <span className="material-symbols-outlined">help_center</span>
                                </button>
                                <div className="h-8 w-px bg-outline-variant mx-sm"></div>
                                <Link href={route('profile.edit')} className="flex items-center gap-sm hover:opacity-80 transition-opacity">
                                    <div className="text-right hidden sm:block">
                                        <p className="font-label-lg text-label-lg leading-none">{user?.name || 'Usuario'}</p>
                                        <p className="text-xs text-on-surface-variant">{user?.email || ''}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-primary-container/30 flex items-center justify-center font-bold text-primary overflow-hidden">
                                        <span className="material-symbols-outlined">admin_panel_settings</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </header>

                    {/* DASHBOARD CANVAS */}
                    <main className="p-xl space-y-xl relative flex-1">
                        <div className="absolute inset-0 otomi-pattern pointer-events-none"></div>

                        {/* HEADER SECTION */}
                        <div className="flex justify-between items-end relative z-10">
                            <div>
                                <h2 className="font-headline-lg text-headline-lg text-on-background">Panel de Control</h2>
                                <p className="font-body-md text-on-surface-variant">Resumen ejecutivo del estado del sistema y actividad de usuarios.</p>
                            </div>
                            <div className="flex gap-md">
                                <button className="flex items-center gap-xs px-lg py-sm rounded-xl border-2 border-secondary bg-transparent text-secondary font-bold border-press transition-all hover:bg-secondary/5">
                                    <span className="material-symbols-outlined">download</span>
                                    Exportar Reporte
                                </button>
                                <button className="flex items-center gap-xs px-lg py-sm rounded-xl bg-primary text-on-primary font-bold border-press transition-all hover:opacity-90">
                                    <span className="material-symbols-outlined">add</span>
                                    Nuevo Docente
                                </button>
                            </div>
                        </div>

                        {/* METRIC CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg relative z-10">
                            <div className="bg-surface-container-lowest p-lg rounded-xl sunset-shadow border border-outline-variant flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex justify-between items-start">
                                    <div className="p-sm bg-primary-container/10 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">group</span>
                                    </div>
                                </div>
                                <div className="mt-lg">
                                    <p className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">Total de Usuarios</p>
                                    <p className="font-display-lg text-display-lg mt-xs">{stats.totalUsers}</p>
                                </div>
                            </div>

                            <div className="bg-surface-container-lowest p-lg rounded-xl sunset-shadow border border-outline-variant flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex justify-between items-start">
                                    <div className="p-sm bg-tertiary-container/10 rounded-lg text-tertiary">
                                        <span className="material-symbols-outlined">school</span>
                                    </div>
                                </div>
                                <div className="mt-lg">
                                    <p className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">Docentes Activos</p>
                                    <p className="font-display-lg text-display-lg mt-xs">{stats.activeTeachers}</p>
                                </div>
                            </div>

                            <div className="bg-surface-container-lowest p-lg rounded-xl sunset-shadow border border-outline-variant flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex justify-between items-start">
                                    <div className="p-sm bg-secondary-container/20 rounded-lg text-secondary">
                                        <span className="material-symbols-outlined">face</span>
                                    </div>
                                </div>
                                <div className="mt-lg">
                                    <p className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">Estudiantes</p>
                                    <p className="font-display-lg text-display-lg mt-xs">{stats.students}</p>
                                </div>
                            </div>

                            <div className="bg-primary p-lg rounded-xl sunset-shadow-lg text-on-primary flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex justify-between items-start">
                                    <div className="p-sm bg-white/20 rounded-lg text-white">
                                        <span className="material-symbols-outlined">dns</span>
                                    </div>
                                </div>
                                <div className="mt-lg">
                                    <p className="font-label-lg text-label-lg opacity-80 uppercase tracking-wider">Estado del Servidor</p>
                                    <p className="font-display-lg text-display-lg mt-xs">{stats.serverUptime} <span className="text-lg font-normal">Online</span></p>
                                </div>
                            </div>
                        </div>

                        {/* BENTO CONTENT AREA */}
                        <div className="grid grid-cols-12 gap-lg relative z-10">
                            
                            {/* USER MANAGEMENT TABLE */}
                            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant sunset-shadow overflow-hidden">
                                <div className="p-lg border-b border-outline-variant flex justify-between items-center">
                                    <h3 className="font-headline-md text-headline-md text-on-surface">Gestión de Cuentas Recientes</h3>
                                    <div className="flex gap-sm">
                                        <button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors">
                                            <span className="material-symbols-outlined">filter_list</span>
                                        </button>
                                        <button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-surface-container-low text-on-surface-variant font-label-lg">
                                                <th className="p-lg font-semibold">Usuario</th>
                                                <th className="p-lg font-semibold">Rol</th>
                                                <th className="p-lg font-semibold">Fecha Registro</th>
                                                <th className="p-lg font-semibold">Estado</th>
                                                <th className="p-lg font-semibold text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-outline-variant">
                                            {recentUsers.length > 0 ? (
                                                recentUsers.map((item) => (
                                                    <tr key={item.id} className="hover:bg-surface-container transition-colors">
                                                        <td className="p-lg flex items-center gap-md">
                                                            <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center font-bold text-secondary uppercase">
                                                                {item.name?.substring(0, 2)}
                                                            </div>
                                                            <div>
                                                                <p className="font-label-lg">{item.name}</p>
                                                                <p className="text-xs text-on-surface-variant">{item.email}</p>
                                                            </div>
                                                        </td>
                                                        <td className="p-lg text-on-surface-variant">{item.role}</td>
                                                        <td className="p-lg text-on-surface-variant">{item.created_at}</td>
                                                        <td className="p-lg">
                                                            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-bold text-xs uppercase">
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-lg text-right space-x-2">
                                                            <button className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors font-bold text-xs uppercase">Editar</button>
                                                            <button className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-lg transition-colors font-bold text-xs uppercase">Suspender</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="p-lg text-center text-on-surface-variant">
                                                        No hay registros de usuarios recientes.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-lg bg-surface-container-low text-center">
                                    <button className="text-primary font-bold hover:underline">Ver todos los usuarios</button>
                                </div>
                            </div>

                            {/* SYSTEM HEALTH & QUICK ACTIONS */}
                            <div className="col-span-12 lg:col-span-4 space-y-lg">
                                
                                {/* SYSTEM HEALTH MONITOR */}
                                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant sunset-shadow p-lg">
                                    <div className="flex justify-between items-center mb-lg">
                                        <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">Carga del Servidor</h3>
                                        <span className="flex items-center gap-xs text-secondary text-xs font-bold">
                                            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                                            EN VIVO
                                        </span>
                                    </div>
                                    
                                    <div className="pt-lg border-t border-outline-variant space-y-md">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium">Uso de CPU</span>
                                            <span className="text-xs font-bold text-secondary">{systemMetrics.cpu}%</span>
                                        </div>
                                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                                            <div className="bg-secondary h-full rounded-full" style={{ width: `${systemMetrics.cpu}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium">Memoria RAM</span>
                                            <span className="text-xs font-bold text-tertiary">{systemMetrics.ram}%</span>
                                        </div>
                                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                                            <div className="bg-tertiary h-full rounded-full" style={{ width: `${systemMetrics.ram}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* QUICK ACTIONS */}
                                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant sunset-shadow p-lg">
                                    <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider mb-lg">Acciones Rápidas</h3>
                                    <div className="grid grid-cols-1 gap-md">
                                        <button className="w-full flex items-center gap-md p-md rounded-xl bg-surface hover:bg-surface-container transition-all border border-outline-variant text-left group">
                                            <div className="p-sm bg-primary-container/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                                <span className="material-symbols-outlined">manage_accounts</span>
                                            </div>
                                            <span className="font-label-lg text-label-lg">Gestión de Usuarios</span>
                                        </button>
                                        <button className="w-full flex items-center gap-md p-md rounded-xl bg-surface hover:bg-surface-container transition-all border border-outline-variant text-left group">
                                            <div className="p-sm bg-secondary-container/20 rounded-lg text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                                <span className="material-symbols-outlined">settings</span>
                                            </div>
                                            <span className="font-label-lg text-label-lg">Configuración del Sistema</span>
                                        </button>
                                        <button className="w-full flex items-center gap-md p-md rounded-xl bg-surface hover:bg-surface-container transition-all border border-outline-variant text-left group">
                                            <div className="p-sm bg-on-surface-variant/10 rounded-lg text-on-surface-variant group-hover:bg-on-surface-variant group-hover:text-white transition-colors">
                                                <span className="material-symbols-outlined">description</span>
                                            </div>
                                            <span className="font-label-lg text-label-lg">Ver Logs del Sistema</span>
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