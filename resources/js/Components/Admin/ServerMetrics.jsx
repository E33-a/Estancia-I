export default function ServerMetrics({ metrics = { cpu: 0, ram: 0 } }) {
    return (
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
                    <span className="text-xs font-bold text-secondary">{metrics.cpu}%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: `${metrics.cpu}%` }}></div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">Memoria RAM</span>
                    <span className="text-xs font-bold text-tertiary">{metrics.ram}%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: `${metrics.ram}%` }}></div>
                </div>
            </div>
        </div>
    );
}