import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import AdminHeader from '@/Components/Admin/AdminHeader';

export default function AdminLayout({ children, title = "Admin Panel" }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <Head title={`${title} - Raíces Vivas`} />

            {/* Inyección de fuentes e íconos */}
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
                {/* Sidebar */}
                <Sidebar 
                    isOpen={sidebarOpen} 
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
                />

                {/* Contenido principal con margen reactivo */}
                <div className={`${sidebarOpen ? 'ml-72' : 'ml-20'} flex-1 min-h-screen relative flex flex-col transition-all duration-300`}>
                    <AdminHeader user={auth?.user} />

                    <main className="p-xl space-y-xl relative flex-1">
                        <div className="absolute inset-0 otomi-pattern pointer-events-none"></div>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}