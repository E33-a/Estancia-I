import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Docente({ students = [], stats = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                        👨‍🏫 Panel del Docente --- Seguimiento y Evaluación
                    </h2>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                        Yoliztli v1.0.0
                    </span>
                </div>
            }
        >
            <Head title="Panel del Docente" />

            <div className="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Tarjetas de Estadísticas Principales */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.id}
                                className={`overflow-hidden rounded-xl border ${stat.border || 'border-gray-200'} bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700 transition hover:shadow-md`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            {stat.title}
                                        </p>
                                        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${stat.color || 'bg-gray-100'}`}
                                    >
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tabla de Alumnos y Progreso */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/80">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📊 Avance Individual de Alumnos
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Monitoreo en tiempo real del progreso de lectura y actividades realizadas.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                                <thead className="bg-gray-100/70 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Alumno</th>
                                        <th scope="col" className="px-6 py-3">Correo Electrónico</th>
                                        <th scope="col" className="px-6 py-3">Estatus</th>
                                        <th scope="col" className="px-6 py-3">Última Actividad</th>
                                        <th scope="col" className="px-6 py-3">Progreso Global</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {students.length > 0 ? (
                                        students.map((student) => (
                                            <tr
                                                key={student.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    {student.name}
                                                </td>
                                                <td className="px-6 py-4">{student.email}</td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                            student.status === 'Activo'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                                                        }`}
                                                    >
                                                        {student.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">{student.last_activity}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                                                            <div
                                                                className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                                                                style={{ width: `${student.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs font-bold w-10 text-right">
                                                            {student.progress}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                No se encontraron alumnos registrados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
