import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
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
    );
}