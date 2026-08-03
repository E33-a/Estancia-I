import { Link, usePage } from '@inertiajs/react';

export default function ImpersonationBanner() {
    const { auth } = usePage().props;

    // Solo se muestra si estamos en modo impersonación
    if (!auth?.is_impersonating) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white px-4 py-2 flex justify-between items-center shadow-lg animate-bounce-short">
            <div className="flex items-center gap-2 font-medium text-sm">
                <span className="material-symbols-outlined text-base">visibility</span>
                <span>
                    Estás navegando como: <strong>{auth.user?.name}</strong> ({auth.user?.email})
                </span>
            </div>
            
            <Link
                href={route('impersonate.leave')}
                className="bg-white text-amber-900 hover:bg-amber-100 px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
            >
                <span className="material-symbols-outlined text-sm">logout</span>
                Volver a mi cuenta Admin
            </Link>
        </div>
    );
}