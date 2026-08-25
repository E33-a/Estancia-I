import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Admin/StatCard';

export default function UsersIndex({ users, filters, stats }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleFilterChange = (updatedFilters) => {
        router.get(
            route('admin.users.index'),
            { search, role, status, ...updatedFilters },
            { preserveState: true, replace: true }
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleFilterChange({});
    };

    const handleClearFilters = () => {
        setSearch('');
        setRole('');
        setStatus('');
        router.get(route('admin.users.index'), {}, { preserveState: true, replace: true });
    };

    const handleToggleStatus = (userId) => {
        router.post(route('admin.users.toggle-status', userId), {}, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Gestión de Usuarios - Raíces Vivas">
            {/* Title Bar & Actions */}
            <div className="flex justify-between items-end relative z-10">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Gestión de Usuarios</h2>
                    <p className="font-body-md text-on-surface-variant">Control centralizado de accesos, roles y actividad institucional.</p>
                </div>
                <button className="flex items-center gap-xs px-lg py-sm rounded-xl bg-primary text-on-primary font-bold border-press transition-all hover:opacity-90 shadow-md">
                    <span className="material-symbols-outlined">person_add</span>
                    Create User
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg relative z-10">
                <StatCard title="Total Users" value={stats.totalUsers} icon="groups" variant="primary" />
                <StatCard title="Active Teachers" value={stats.activeTeachers} icon="school" variant="tertiary" />
                <StatCard title="Active Students" value={stats.activeStudents} icon="auto_stories" variant="secondary" />
            </div>

            {/* Directory Table */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden relative z-10">
                {/* Filters Bar */}
                <div className="p-4 bg-surface border-b border-outline-variant flex flex-wrap items-center gap-4">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search users by name, email..."
                            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface"
                        />
                    </form>

                    <select
                        value={role}
                        onChange={(e) => { setRole(e.target.value); handleFilterChange({ role: e.target.value }); }}
                        className="bg-surface-container border border-outline-variant rounded-lg text-sm px-3 py-2 text-on-surface"
                    >
                        <option value="">All Roles</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>

                    <select
                        value={status}
                        onChange={(e) => { setStatus(e.target.value); handleFilterChange({ status: e.target.value }); }}
                        className="bg-surface-container border border-outline-variant rounded-lg text-sm px-3 py-2 text-on-surface"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    {(search || role || status) && (
                        <button onClick={handleClearFilters} className="ml-auto text-sm text-primary flex items-center gap-1 font-bold">
                            <span className="material-symbols-outlined text-sm">close</span> Clear all
                        </button>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-container-high border-b border-outline-variant text-sm font-bold text-on-surface-variant">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant text-sm">
                            {users.data.map((user) => {
                                const isActive = user.status !== 'inactive';
                                return (
                                    <tr key={user.id} className="hover:bg-surface-container-low transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary">
                                                    {user.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`font-bold ${!isActive ? 'line-through opacity-60' : ''}`}>{user.name}</span>
                                                    <span className="text-xs text-on-surface-variant">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-secondary-container/30 text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-secondary' : 'bg-on-surface-variant'}`}></span>
                                                <span className="capitalize">{user.status || 'Active'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center items-center gap-2">
                                                {/* Impersonar Usuario */}
                                                <a
                                                    href={route('impersonate', user.id)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-primary-container text-on-surface-variant"
                                                    title="Suplantar usuario"
                                                >
                                                    <span className="material-symbols-outlined text-lg">manage_accounts</span>
                                                </a>

                                                {/* Alternar Estado Activo / Inactivo */}
                                                <button
                                                    onClick={() => handleToggleStatus(user.id)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-error-container text-on-surface-variant"
                                                    title={isActive ? 'Desactivar' : 'Activar'}
                                                >
                                                    <span className="material-symbols-outlined text-lg">
                                                        {isActive ? 'block' : 'check_circle'}
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 bg-surface border-t border-outline-variant flex items-center justify-between text-sm">
                    <span>Showing {users.from || 0} to {users.to || 0} of {users.total} users</span>
                    <div className="flex gap-1">
                        {users.links.map((link, key) => (
                            <button
                                key={key}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 rounded-lg border border-outline-variant text-xs ${
                                    link.active ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container'
                                } ${!link.url && 'opacity-40 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}