import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import AdminHeader from '@/Components/Admin/AdminHeader';
import StatCard from '@/Components/Admin/StatCard';
import UserTable from '@/Components/Admin/UserTable';
import ServerMetrics from '@/Components/Admin/ServerMetrics';
import QuickActions from '@/Components/Admin/QuickActions';

export default function Dashboard({ 
    stats = { totalUsers: 0, activeTeachers: 0, students: 0, serverUptime: '0%' }, 
    recentUsers = [],
    systemMetrics = { cpu: 0, ram: 0 }
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Panel de Administración - Raíces Vivas" />

            {/* Estilos e íconos externos */}
            <link 
                href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" 
                rel="stylesheet" 
            />
            <link 
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" 
                rel="stylesheet" 
            />

            <style>{`
                .otomi-pattern {
                    opacity: 0.04;
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l-20-20l-10 10l30 30l30-30l-10-10z' fill='%239a4028'/%3E%3C/svg%3E");
                }
                .sunset-shadow { box-shadow: 0 12px 32px -8px rgba(154, 64, 40, 0.12); }
                .sunset-shadow-lg { box-shadow: 0 20px 40px -12px rgba(154, 64, 40, 0.25); }
                .border-press:active { transform: translateY(2px); }
            `}</style>

            <div className="bg-surface font-body-md text-on-surface min-h-screen flex relative overflow-x-hidden">
                {/* Lateral Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="ml-72 flex-1 min-h-screen relative flex flex-col">
                    <AdminHeader user={auth?.user} />

                    <main className="p-xl space-y-xl relative flex-1">
                        <div className="absolute inset-0 otomi-pattern pointer-events-none"></div>

                        {/* Title Bar & Actions */}
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

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg relative z-10">
                            <StatCard title="Total de Usuarios" value={stats.totalUsers} icon="group" variant="primary" />
                            <StatCard title="Docentes Activos" value={stats.activeTeachers} icon="school" variant="tertiary" />
                            <StatCard title="Estudiantes" value={stats.students} icon="face" variant="secondary" />
                            <StatCard title="Estado del Servidor" value={stats.serverUptime} icon="dns" variant="highlight" badge="Online" />
                        </div>

                        {/* Main Grid Section */}
                        <div className="grid grid-cols-12 gap-lg relative z-10">
                            <UserTable users={recentUsers} />
                            
                            <div className="col-span-12 lg:col-span-4 space-y-lg">
                                <ServerMetrics metrics={systemMetrics} />
                                <QuickActions />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}