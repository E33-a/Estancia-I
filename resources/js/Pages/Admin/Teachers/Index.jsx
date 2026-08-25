import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function TeachersIndex({ auth, stats, teachers = [], availableTeachers = [], destinations = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        teacher_id: '',
        assignment_type: 'virtual',
        destination_id: '',
    });

    const handleAssignSubmit = (e) => {
        e.preventDefault();
        post(route('admin.teachers.assign'));
    };

    return (
        <AdminLayout user={auth?.user}>
            <div className="otomi-watermark font-body-md text-on-surface p-margin-mobile md:p-margin-tablet">
                {/* Header & Quick Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-md">
                    <div>
                        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs font-bold text-shadow-subtle">
                            Matriz y Asignación Docente
                        </h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                            Gestione el registro de educadores, asigne escuelas y supervise el estado de las licencias lingüísticas para garantizar una cobertura educativa culturalmente auténtica.
                        </p>
                    </div>
                    <button className="flex items-center space-x-sm bg-primary text-on-primary py-sm px-lg rounded-lg font-label-lg text-label-lg hover:bg-surface-tint transition-colors border-b-2 border-on-primary-fixed-variant sunset-shadow shrink-0">
                        <span className="material-symbols-outlined">person_add</span>
                        <span>+ Nuevo Docente</span>
                    </button>
                </div>

                {/* Cards de Estadísticas Dinámicas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                    <div className="bg-surface-container-lowest p-lg rounded-xl border border-surface-variant sunset-shadow flex items-center justify-between">
                        <div>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Total de Docentes</p>
                            <p className="font-display-lg text-display-lg text-primary">{stats?.total_teachers ?? 0}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                            <span className="material-symbols-outlined">groups</span>
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest p-lg rounded-xl border border-surface-variant sunset-shadow flex items-center justify-between">
                        <div>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Licencias Activas</p>
                            <p className="font-display-lg text-display-lg text-secondary">{stats?.active_licenses ?? 0}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                            <span className="material-symbols-outlined">verified</span>
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest p-lg rounded-xl border border-surface-variant sunset-shadow flex items-center justify-between">
                        <div>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Escuelas Cubiertas</p>
                            <p className="font-display-lg text-display-lg text-tertiary">{stats?.covered_schools ?? 0}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                            <span className="material-symbols-outlined">account_balance</span>
                        </div>
                    </div>
                </div>

                {/* Directorio y Vinculación */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                    {/* Tabla de Educadores */}
                    <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-surface-variant sunset-shadow overflow-hidden">
                        <div className="p-lg border-b border-surface-variant flex justify-between items-center geometric-border">
                            <h3 className="font-headline-md text-headline-md text-on-surface">Directorio de Educadores</h3>
                            <button className="text-primary hover:bg-surface-container-low p-xs rounded-full transition-colors">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low border-b border-surface-variant">
                                        <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Docente</th>
                                        <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Especialidad</th>
                                        <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Asignación</th>
                                        <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Estado</th>
                                        <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-variant">
                                    {teachers.length > 0 ? (
                                        teachers.map((teacher) => (
                                            <tr key={teacher.id} className="hover:bg-surface-bright transition-colors group">
                                                <td className="py-sm px-md">
                                                    <div className="flex items-center space-x-sm">
                                                        {teacher.avatar ? (
                                                            <img 
                                                                src={teacher.avatar} 
                                                                alt={teacher.name} 
                                                                className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-label-lg text-label-lg border border-outline-variant">
                                                                {teacher.initials || teacher.name?.substring(0, 2).toUpperCase() || 'DOC'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">{teacher.name}</p>
                                                            <p className="font-label-sm text-label-sm text-on-surface-variant">ID: {teacher.code || teacher.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-sm px-md">
                                                    <span className="inline-flex items-center px-sm py-xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                                                        {teacher.specialty}
                                                    </span>
                                                </td>
                                                <td className="py-sm px-md">
                                                    {teacher.assignment ? (
                                                        <>
                                                            <p className="font-body-md text-body-md text-on-surface">{teacher.assignment}</p>
                                                            {teacher.group && <p className="font-label-sm text-label-sm text-on-surface-variant">{teacher.group}</p>}
                                                        </>
                                                    ) : (
                                                        <p className="font-body-md text-body-md text-on-surface-variant italic">Sin Asignación</p>
                                                    )}
                                                </td>
                                                <td className="py-sm px-md">
                                                    {teacher.status === 'active' && (
                                                        <div className="flex items-center space-x-xs text-secondary">
                                                            <span className="material-symbols-outlined text-sm">check_circle</span>
                                                            <span className="font-label-sm text-label-sm">Activa</span>
                                                        </div>
                                                    )}
                                                    {teacher.status === 'warning' && (
                                                        <div className="flex items-center space-x-xs text-tertiary">
                                                            <span className="material-symbols-outlined text-sm">warning</span>
                                                            <span className="font-label-sm text-label-sm">Por Expirar</span>
                                                        </div>
                                                    )}
                                                    {teacher.status === 'inactive' && (
                                                        <div className="flex items-center space-x-xs text-error">
                                                            <span className="material-symbols-outlined text-sm">cancel</span>
                                                            <span className="font-label-sm text-label-sm">Inactiva</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-sm px-md text-right">
                                                    <button className="text-on-surface-variant hover:text-primary transition-colors p-xs">
                                                        <span className="material-symbols-outlined">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-lg text-center text-on-surface-variant py-xl">
                                                No hay docentes registrados en el sistema.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-md border-t border-surface-variant flex justify-center bg-surface-container-lowest">
                            <button className="text-primary font-label-lg text-label-lg hover:underline transition-all">Ver Todos los Docentes</button>
                        </div>
                    </div>

                    {/* Panel de Vinculación Rápida */}
                    <div className="lg:col-span-1 flex flex-col gap-lg">
                        <div className="bg-surface-container-lowest p-lg rounded-xl border border-surface-variant sunset-shadow">
                            <div className="flex items-center space-x-sm mb-md pb-sm border-b border-surface-variant">
                                <span className="material-symbols-outlined text-primary">link</span>
                                <h3 className="font-headline-md text-headline-md text-on-surface">Vinculación Rápida</h3>
                            </div>
                            <p className="font-body-sm text-label-sm text-on-surface-variant mb-md">
                                Asigne rápidamente docentes disponibles a grupos o escuelas que requieran cobertura.
                            </p>
                            <form onSubmit={handleAssignSubmit} className="space-y-md">
                                <div className="flex flex-col space-y-xs">
                                    <label className="font-label-lg text-label-lg text-on-surface" htmlFor="teacher-select">Docente Disponible</label>
                                    <div className="relative">
                                        <select 
                                            id="teacher-select"
                                            value={data.teacher_id}
                                            onChange={(e) => setData('teacher_id', e.target.value)}
                                            className="w-full appearance-none bg-surface border-2 border-outline rounded-lg py-sm pl-md pr-xl font-body-md text-body-md text-on-surface focus:border-primary focus:ring-0 transition-colors"
                                        >
                                            <option value="" disabled>Seleccione un docente...</option>
                                            {availableTeachers.map((t) => (
                                                <option key={t.id} value={t.id}>{t.name} ({t.specialty})</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
                                    </div>
                                    {errors.teacher_id && <span className="text-error text-xs">{errors.teacher_id}</span>}
                                </div>

                                <div className="flex flex-col space-y-xs">
                                    <label className="font-label-lg text-label-lg text-on-surface">Tipo de Asignación</label>
                                    <div className="grid grid-cols-2 gap-sm">
                                        <label className="cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="assignment_type" 
                                                value="virtual"
                                                checked={data.assignment_type === 'virtual'}
                                                onChange={(e) => setData('assignment_type', e.target.value)}
                                                className="peer sr-only"
                                            />
                                            <div className="text-center py-sm rounded-lg border border-outline-variant peer-checked:bg-primary-container peer-checked:border-primary peer-checked:text-on-primary-container font-label-sm transition-all">
                                                Virtual
                                            </div>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="assignment_type" 
                                                value="physical"
                                                checked={data.assignment_type === 'physical'}
                                                onChange={(e) => setData('assignment_type', e.target.value)}
                                                className="peer sr-only"
                                            />
                                            <div className="text-center py-sm rounded-lg border border-outline-variant peer-checked:bg-primary-container peer-checked:border-primary peer-checked:text-on-primary-container font-label-sm transition-all">
                                                Física
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-xs">
                                    <label className="font-label-lg text-label-lg text-on-surface" htmlFor="destination-select">Grupo / Escuela</label>
                                    <div className="relative">
                                        <select 
                                            id="destination-select"
                                            value={data.destination_id}
                                            onChange={(e) => setData('destination_id', e.target.value)}
                                            className="w-full appearance-none bg-surface border-2 border-outline rounded-lg py-sm pl-md pr-xl font-body-md text-body-md text-on-surface focus:border-primary focus:ring-0 transition-colors"
                                        >
                                            <option value="" disabled>Seleccione destino...</option>
                                            {destinations.map((d) => (
                                                <option key={d.id} value={d.id}>{d.name}</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
                                    </div>
                                    {errors.destination_id && <span className="text-error text-xs">{errors.destination_id}</span>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-surface-container border-2 border-secondary text-secondary py-sm rounded-lg font-label-lg text-label-lg hover:bg-secondary hover:text-on-secondary transition-colors mt-md flex justify-center items-center gap-xs"
                                >
                                    <span className="material-symbols-outlined">sync_alt</span>
                                    Vincular
                                </button>
                            </form>
                        </div>

                        <div className="bg-surface-variant p-md rounded-xl border border-outline-variant/30 flex items-start gap-md">
                            <span className="material-symbols-outlined text-primary mt-1">info</span>
                            <div>
                                <h4 className="font-label-lg text-label-lg text-on-surface mb-1">Renovación de Licencias</h4>
                                <p className="font-body-sm text-label-sm text-on-surface-variant">Las licencias que expiran en menos de 30 días se marcan en alerta. Asegúrese de contactar a los docentes para su renovación oportuna.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}