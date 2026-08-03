import { Link, usePage } from '@inertiajs/react';

export default function ImpersonationBanner() {
    const { auth } = usePage().props;

    // Solo se muestra si en los props de Inertia detectamos que el usuario está siendo impersonado
    if (!auth?.is_impersonating) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-tertiary text-on-tertiary px-lg py-sm shadow-lg flex items-center justify-between border-b-2 border-tertiary-container animate-slide-down">
            <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-xl animate-pulse">
                    incognito
                </span>
                <p className="font-label-lg text-sm font-medium">
                    Estás navegando como: <strong className="underline decoration-2">{auth.user?.name}</strong> ({auth.user?.email})
                </p>
            </div>

            <Link
                href={route('impersonate.leave')}
                method="post"
                as="button"
                className="flex items-center gap-xs bg-on-tertiary text-tertiary hover:bg-surface-bright px-md py-xs rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
                <span className="material-symbols-outlined text-sm">
                    logout
                </span>
                Volver a Admin
            </Link>
        </div>
    );
}