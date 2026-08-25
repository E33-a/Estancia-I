export default function ServerMetrics({ metrics }) {
    // Si no vienen métricas, asumimos null o 0 sin falsear datos
    const cpu = metrics?.cpu ?? 0;
    const ram = metrics?.ram ?? 0;
    const hasData = metrics?.cpu !== undefined && metrics?.ram !== undefined;

    return (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant sunset-shadow p-lg">
            <div className="flex justify-between items-center mb-lg">
                <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">
                    Carga del Servidor
                </h3>
                <span className={`flex items-center gap-xs text-xs font-bold ${hasData ? 'text-secondary' : 'text-on-surface-variant/50'}`}>
                    <span className={`w-2 h-2 rounded-full ${hasData ? 'bg-secondary animate-pulse' : 'bg-outline-variant'}`}></span>
                    {hasData ? 'EN VIVO' : 'SIN DATOS'}
                </span>
            </div>
            
            <div className="pt-lg border-t border-outline-variant space-y-md">
                {/* CPU */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">Uso de CPU</span>
                        <span className="text-xs font-bold text-secondary">
                            {hasData ? `${cpu}%` : 'N/D'}
                        </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div 
                            className="bg-secondary h-full rounded-full transition-all duration-300" 
                            style={{ width: `${cpu}%` }}
                        ></div>
                    </div>
                </div>

                {/* RAM */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">Memoria RAM</span>
                        <span className="text-xs font-bold text-tertiary">
                            {hasData ? `${ram}%` : 'N/D'}
                        </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div 
                            className="bg-tertiary h-full rounded-full transition-all duration-300" 
                            style={{ width: `${ram}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}