import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function SystemHealth({ metrics, storage, services }) {
    return (
        <AdminLayout>
            <Head title="Salud e Infraestructura" />

            {/* Page Header */}
            <div className="mb-lg">
                <h2 className="font-display-lg text-display-lg text-on-surface mb-xs">Salud e Infraestructura</h2>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    Monitoreo técnico y diagnóstico de la infraestructura cloud.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
                {/* Performance KPIs */}
                <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-md">
                    <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm relative overflow-hidden group">
                        <div className="flex items-center gap-2 mb-sm relative z-10">
                            <div className="w-2 h-2 rounded-full bg-secondary pulse-dot"></div>
                            <span className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">Real-time Latency</span>
                        </div>
                        <div className="font-headline-lg text-headline-lg text-on-surface relative z-10">
                            {metrics.latency} <span className="text-body-md text-on-surface-variant">ms</span>
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm relative overflow-hidden group">
                        <div className="flex items-center gap-2 mb-sm relative z-10">
                            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">developer_board</span>
                            <span className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">CPU Load</span>
                        </div>
                        <div className="font-headline-lg text-headline-lg text-on-surface relative z-10">
                            {metrics.cpuLoad} <span className="text-body-md text-on-surface-variant">%</span>
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm relative overflow-hidden group">
                        <div className="flex items-center gap-2 mb-sm relative z-10">
                            <span className="material-symbols-outlined text-secondary text-[18px]">dns</span>
                            <span className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">System Uptime</span>
                        </div>
                        <div className="font-headline-lg text-headline-lg text-on-surface relative z-10">
                            {metrics.uptime} <span className="text-body-md text-on-surface-variant">%</span>
                        </div>
                    </div>
                </div>

                {/* Storage & Breakdown */}
                <div className="md:col-span-4 flex flex-col gap-lg">
                    <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <span className="font-display-lg text-display-lg text-on-surface">
                                {storage.used_gb > 1024 ? `${storage.used_tb} TB` : `${storage.used_gb} GB`}{' '}
                                <span className="text-body-md text-on-surface-variant font-body-md">used</span>
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant mb-2">of {storage.total_tb}TB</span>
                        </div>
                        <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${storage.percentage}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Infrastructure Services */}
                <div className="md:col-span-12 bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                        {services.map((service, index) => (
                            <div key={index} className="flex items-center gap-md p-sm rounded-lg border border-transparent hover:border-outline-variant hover:bg-surface-container-low transition-all">
                                <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-on-surface-variant">{service.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-label-lg text-label-lg text-on-surface">{service.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${service.status === 'Operational' ? 'bg-secondary' : 'bg-error'}`}></span>
                                        <span className={`font-label-sm text-label-sm ${service.status === 'Operational' ? 'text-secondary' : 'text-error'}`}>{service.status}</span>
                                    </div>
                                </div>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">{service.last_check}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}