export default function QuickActions() {
    return (
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
    );
}