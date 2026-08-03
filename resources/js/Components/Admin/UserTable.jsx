import React from 'react';
import { Link } from '@inertiajs/react';

export default function UserTable({ users = [] }) {
    // Soportar array directo o estructura de paginación de Laravel
    const userList = Array.isArray(users) ? users : (users?.data || []);

    // Formateador de fecha profesional y legible
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    // Estilos dinámicos según el Rol del usuario
    const getRoleBadge = (role) => {
        const roleNormalized = role?.toLowerCase() || '';
        
        switch (roleNormalized) {
            case 'admin':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'teacher':
            case 'docente':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'student':
            case 'estudiante':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    // Traducción amigable del Rol
    const formatRoleName = (role) => {
        const roles = {
            admin: 'Administrador',
            teacher: 'Docente',
            docente: 'Docente',
            student: 'Estudiante',
            estudiante: 'Estudiante',
        };
        return roles[role?.toLowerCase()] || role || 'Sin rol';
    };

    return (
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl border border-outline-variant sunset-shadow overflow-hidden flex flex-col justify-between">
            {/* Encabezado de la Tarjeta */}
            <div>
                <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
                    <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                            Gestión de Cuentas Recientes
                        </h3>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                            Últimos usuarios registrados en la plataforma
                        </p>
                    </div>
                    <div className="flex gap-xs">
                        <button 
                            className="p-2 hover:bg-surface-container-high rounded-xl text-on-surface-variant transition-all active:scale-95"
                            title="Filtrar lista"
                        >
                            <span 
                                className="material-symbols-outlined select-none text-xl block" 
                                style={{ fontFamily: '"Material Symbols Outlined"' }}
                            >
                                filter_list
                            </span>
                        </button>
                        <button 
                            className="p-2 hover:bg-surface-container-high rounded-xl text-on-surface-variant transition-all active:scale-95"
                            title="Más opciones"
                        >
                            <span 
                                className="material-symbols-outlined select-none text-xl block" 
                                style={{ fontFamily: '"Material Symbols Outlined"' }}
                            >
                                more_vert
                            </span>
                        </button>
                    </div>
                </div>

                {/* Tabla de Usuarios */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low/60 text-on-surface-variant text-xs font-semibold uppercase tracking-wider border-b border-outline-variant">
                                <th className="py-3.5 px-lg">Usuario</th>
                                <th className="py-3.5 px-lg">Rol</th>
                                <th className="py-3.5 px-lg whitespace-nowrap">Registro</th>
                                <th className="py-3.5 px-lg">Estado</th>
                                <th className="py-3.5 px-lg text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant text-sm">
                            {userList.length > 0 ? (
                                userList.map((item) => (
                                    <tr 
                                        key={item.id} 
                                        className="hover:bg-surface-container-low/50 transition-colors group"
                                    >
                                        {/* USUARIO (Avatar + Nombre + Email) */}
                                        <td className="p-lg">
                                            <div className="flex items-center gap-md">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold uppercase shrink-0 border border-primary/20 shadow-sm">
                                                    {item.name?.substring(0, 2)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-on-surface-variant truncate">
                                                        {item.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* ROL (Badge personalizado) */}
                                        <td className="p-lg whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getRoleBadge(item.role || item.roles?.[0]?.name)}`}>
                                                {formatRoleName(item.role || item.roles?.[0]?.name)}
                                            </span>
                                        </td>

                                        {/* FECHA REGISTRO */}
                                        <td className="p-lg text-on-surface-variant text-xs font-medium whitespace-nowrap">
                                            {formatDate(item.created_at)}
                                        </td>

                                        {/* ESTADO */}
                                        <td className="p-lg whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium text-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                {item.status || 'Activo'}
                                            </span>
                                        </td>

                                        {/* ACCIONES DE BOTONES */}
                                        <td className="p-lg text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1">
                                                {/* Botón Impersonar (Navega por GET) */}
                                                <Link 
                                                    href={route('impersonate', item.id)} 
                                                    method="get"
                                                    className="p-2 text-tertiary hover:bg-tertiary/10 rounded-xl transition-all active:scale-95 flex items-center justify-center"
                                                    title="Impersonar (Ver como este usuario)"
                                                >
                                                    <span 
                                                        className="material-symbols-outlined select-none text-xl block" 
                                                        style={{ fontFamily: '"Material Symbols Outlined"' }}
                                                    >
                                                        visibility
                                                    </span>
                                                </Link>

                                                {/* Botón Editar */}
                                                <button 
                                                    className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all active:scale-95 flex items-center justify-center"
                                                    title="Editar usuario"
                                                >
                                                    <span 
                                                        className="material-symbols-outlined select-none text-xl block" 
                                                        style={{ fontFamily: '"Material Symbols Outlined"' }}
                                                    >
                                                        edit
                                                    </span>
                                                </button>

                                                {/* Botón Suspender */}
                                                <button 
                                                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95 flex items-center justify-center"
                                                    title="Suspender usuario"
                                                >
                                                    <span 
                                                        className="material-symbols-outlined select-none text-xl block" 
                                                        style={{ fontFamily: '"Material Symbols Outlined"' }}
                                                    >
                                                        block
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-on-surface-variant">
                                        <div className="flex flex-col items-center justify-center gap-xs">
                                            <span 
                                                className="material-symbols-outlined text-4xl text-on-surface-variant/40"
                                                style={{ fontFamily: '"Material Symbols Outlined"' }}
                                            >
                                                group_off
                                            </span>
                                            <p className="font-medium text-sm">No hay registros de usuarios recientes.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer de la Tarjeta */}
            <div className="p-md bg-surface-container-low/40 border-t border-outline-variant text-center">
                <Link 
                    href={route('admin.dashboard')} // Cambia por la ruta completa de lista si existe
                    className="inline-flex items-center gap-xs text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
                >
                    Ver todos los usuarios
                    <span 
                        className="material-symbols-outlined text-sm"
                        style={{ fontFamily: '"Material Symbols Outlined"' }}
                    >
                        arrow_forward
                    </span>
                </Link>
            </div>
        </div>
    );
}