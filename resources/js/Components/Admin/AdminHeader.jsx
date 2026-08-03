import { Link } from '@inertiajs/react';

export default function AdminHeader({ user }) {
    return (
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
    );
}