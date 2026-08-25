import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Admin/StatCard';
import UserTable from '@/Components/Admin/UserTable';
import ServerMetrics from '@/Components/Admin/ServerMetrics';
import QuickActions from '@/Components/Admin/QuickActions';

export default function Dashboard({ 
    stats = { totalUsers: 0, activeTeachers: 0, students: 0, serverUptime: 'N/A' }, 
    recentUsers = [],
    systemMetrics = null
}) {
    return (
        <AdminLayout title="Panel de Administración">
            {/* Title Bar & Actions */}
            <div className="flex justify-between items-end relative z-10">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Panel de Control</h2>
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
                <StatCard title="Estado del Servidor" value={stats.serverUptime} icon="dns" variant="highlight" />
            </div>

            {/* Main Grid Section */}
            <div className="grid grid-cols-12 gap-lg relative z-10">
                <UserTable users={recentUsers} />
                
                <div className="col-span-12 lg:col-span-4 space-y-lg">
                    <ServerMetrics metrics={systemMetrics} />
                    <QuickActions />
                </div>
            </div>
        </AdminLayout>
    );
}