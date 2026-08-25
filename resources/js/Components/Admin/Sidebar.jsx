// resources/js/Components/Sidebar.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar({ isOpen = true, toggleSidebar }) {
    const activeClass = "flex items-center gap-md p-md rounded-lg text-primary dark:text-inverse-primary font-bold border-l-4 border-primary dark:border-inverse-primary bg-primary-container/10 transition-all duration-200 overflow-hidden whitespace-nowrap";
    const inactiveClass = "flex items-center gap-md p-md rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container transition-all duration-200 overflow-hidden whitespace-nowrap";

    return (
        <aside className={`fixed left-0 top-0 h-screen flex flex-col z-40 bg-surface dark:bg-inverse-surface shadow-sm p-lg transition-all duration-300 ${isOpen ? 'w-72' : 'w-20'}`}>
            {/* Header + Botón Toggle */}
            <div className={`mb-xl flex items-center ${isOpen ? 'justify-between px-sm' : 'justify-center'}`}>
                {isOpen && (
                    <div className="overflow-hidden whitespace-nowrap">
                        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary leading-tight">
                            Raíces Vivas
                        </h1>
                        <p className="font-label-lg text-label-lg text-on-surface-variant opacity-70">
                            System Administrator
                        </p>
                    </div>
                )}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                    title={isOpen ? "Colapsar menú" : "Expandir menú"}
                >
                    <span className="material-symbols-outlined">
                        {isOpen ? 'menu_open' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Menú de Navegación */}
            <nav className="flex-1 flex flex-col gap-xs overflow-y-auto">
                <Link 
                    href={route('admin.dashboard')} 
                    className={route().current('admin.dashboard') ? activeClass : inactiveClass}
                    title={!isOpen ? "Analytics" : ""}
                >
                    <span className="material-symbols-outlined min-w-[24px]">leaderboard</span>
                    {isOpen && <span className="font-label-lg text-label-lg font-bold">Analytics</span>}
                </Link>

                <Link 
                    href={route('admin.users.index')} 
                    className={route().current('admin.users.index') ? activeClass : inactiveClass}
                    title={!isOpen ? "User Control" : ""}
                >
                    <span className="material-symbols-outlined min-w-[24px]">manage_accounts</span>
                    {isOpen && <span className="font-label-lg text-label-lg font-bold">User Control</span>}
                </Link>

                {/* Ruta de Educator Matrix conectada */}
                <Link 
                    href={route('admin.teachers.index')} 
                    className={route().current('admin.teachers.*') ? activeClass : inactiveClass}
                    title={!isOpen ? "Educator Matrix" : ""}
                >
                    <span className="material-symbols-outlined min-w-[24px]">school</span>
                    {isOpen && <span className="font-label-lg text-label-lg font-bold">Educator Matrix</span>}
                </Link>

                <Link 
                    href={route('admin.linguistic.index')} 
                    className={route().current('admin.linguistic.*') ? activeClass : inactiveClass}
                    title={!isOpen ? "Linguistic Data" : ""}
                >
                    <span className="material-symbols-outlined min-w-[24px]">translate</span>
                    {isOpen && <span className="font-label-lg text-label-lg font-bold">Linguistic Data</span>}
                </Link>

                <Link 
                    href={route('admin.system-health.index')}
                    className={route().current('admin.health.*') ? activeClass : inactiveClass}
                    title={!isOpen ? "System Health" : ""}
                >
                    <span className="material-symbols-outlined min-w-[24px]">settings_heart</span>
                    {isOpen && <span className="font-label-lg text-label-lg font-bold">System Health</span>}
                </Link>
            </nav>

            {/* Acciones del Pie */}
            <div className="mt-auto border-t border-outline-variant pt-lg flex flex-col gap-xs">
                <button 
                    className={`w-full bg-error text-on-error flex items-center justify-center gap-sm py-md rounded-xl font-bold border-press mb-md transition-all active:scale-95 ${!isOpen && 'px-0'}`}
                    title={!isOpen ? "Emergency Lock" : ""}
                >
                    <span className="material-symbols-outlined min-w-[24px]">lock</span>
                    {isOpen && <span className="font-label-lg text-label-lg whitespace-nowrap">Emergency Lock</span>}
                </button>

                <Link 
                    href="#" 
                    className="flex items-center gap-md p-md rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 overflow-hidden whitespace-nowrap"
                    title={!isOpen ? "Logs" : ""}
                >
                    <span className="material-symbols-outlined min-w-[24px]">history</span>
                    {isOpen && <span className="font-label-lg text-label-lg font-bold">Logs</span>}
                </Link>

                <Link 
                    method="post" 
                    href={route('logout')} 
                    as="button" 
                    className="w-full flex items-center gap-md p-md rounded-lg text-on-surface-variant hover:bg-error-container/20 hover:text-error transition-colors duration-200 text-left overflow-hidden whitespace-nowrap"
                    title={!isOpen ? "Log Out" : ""}
                >
                    <span className="material-symbols-outlined min-w-[24px]">logout</span>
                    {isOpen && <span className="font-label-lg text-label-lg font-bold">Log Out</span>}
                </Link>
            </div>
        </aside>
    );
}