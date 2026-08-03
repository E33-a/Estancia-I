import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    // Obtenemos el usuario autenticado desde los props globales
    const user = usePage().props.auth.user;

    // Extraemos los datos del perfil de estudiante con fallback si no existe (ej. docentes)
    const profile = user?.student_profile || {
        level: 1,
        level_progress: 0,
        stars: 0,
        stories_read: 0,
        selected_dialect: 'Español'
    };

    // Colección de insignias
    const badges = user?.badges || [];

    // Estado para controlar qué modal o formulario flotante está abierto
    const [activeModal, setActiveModal] = useState(null);

    // Formatear el nombre del rol para mostrarlo de forma vistosa
    const formattedRole = user.role 
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1) 
        : 'Estudiante';

    return (
        <AuthenticatedLayout>
            <Head title="Mi Perfil" />

            {/* Inyección de fuentes requeridas por el diseño */}
            <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet" />

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 relative z-10 font-body-md bg-background text-on-background min-h-screen">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1 mb-6 text-on-surface-variant text-sm">
                    <Link 
                        href={route('dashboard')} 
                        className="hover:text-primary transition-colors cursor-pointer"
                    >
                        Inicio
                    </Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-primary font-bold">Mi Perfil</span>
                </div>

                {/* Profile Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* COLUMNA IZQUIERDA: Tarjeta de información personal fija */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant relative overflow-hidden shadow-sm">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
                            
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full border-4 border-primary-fixed-dim p-1 bg-surface-container shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                                        <img 
                                            className="w-full h-full object-cover rounded-full" 
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwzZYciMRfpkNFYYAMRSoIBA4eKJZw2KWkObR9VK6xYAD4Yza8361UsQEy3i54ajuiQebCfnI1iNVT5iCA3wkKqA_nQeyQJnUxU3REtJ_Gk5sI0xGNwP1a1Bt71PJ4LLBgkdYMxZNDELES3WAIb99H9wGOBAecQ66QSuUvwpMWncOqTM2v19u-Bdf_GbycP0EaJqdjiTXmonFC-avnSXma02bbtz9iZUO99XrOEXRR9-tIgFfFOhCy" 
                                            alt="Avatar"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-2xl font-bold text-primary mt-4" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                    {user.name}
                                </h1>
                                <p className="text-sm font-semibold text-secondary uppercase tracking-widest mt-1">
                                    {formattedRole}
                                </p>
                            </div>

                            {/* Info Grid */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-on-surface-variant block mb-1">Correo Electrónico</label>
                                    <div className="flex items-center gap-3 bg-surface-container p-3 rounded-lg border border-outline-variant/30">
                                        <span className="material-symbols-outlined text-secondary">mail</span>
                                        <span className="text-on-surface text-sm break-all">{user.email}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-on-surface-variant block mb-1">Dialecto Preferido</label>
                                    <div className="flex items-center gap-3 bg-surface-container p-3 rounded-lg border border-outline-variant/30">
                                        <span className="material-symbols-outlined text-secondary">auto_stories</span>
                                        <span className="text-on-surface text-sm">{profile.selected_dialect}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Trigger Buttons */}
                            <div className="mt-6 flex flex-col gap-3">
                                <button 
                                    onClick={() => setActiveModal('profile')}
                                    className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                                    style={{ fontFamily: 'Bricolage Grotesque' }}
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                    Editar Información
                                </button>
                                <button 
                                    onClick={() => setActiveModal('password')}
                                    className="w-full border-2 border-secondary text-secondary py-3 rounded-lg font-bold hover:bg-secondary-fixed transition-all flex items-center justify-center gap-2"
                                    style={{ fontFamily: 'Bricolage Grotesque' }}
                                >
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                    Cambiar Contraseña
                                </button>
                                <button 
                                    onClick={() => setActiveModal('delete')}
                                    className="w-full text-error font-bold py-2 flex items-center justify-center gap-2 hover:underline text-sm"
                                >
                                    <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                                    Eliminar Cuenta
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Modales dinámicos / Paneles de Estadísticas */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        
                        {/* Renderizado condicional de Formularios Activos */}
                        {activeModal === 'profile' && (
                            <div className="bg-surface-container-lowest p-6 rounded-xl border-2 border-primary shadow-md transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>Modificar Datos</h3>
                                    <button onClick={() => setActiveModal(null)} className="material-symbols-outlined text-on-surface-variant hover:text-error">close</button>
                                </div>
                                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} onSuccess={() => setActiveModal(null)} />
                            </div>
                        )}

                        {activeModal === 'password' && (
                            <div className="bg-surface-container-lowest p-6 rounded-xl border-2 border-secondary shadow-md transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-secondary" style={{ fontFamily: 'Bricolage Grotesque' }}>Seguridad de la cuenta</h3>
                                    <button onClick={() => setActiveModal(null)} className="material-symbols-outlined text-on-surface-variant hover:text-error">close</button>
                                </div>
                                <UpdatePasswordForm onSuccess={() => setActiveModal(null)} />
                            </div>
                        )}

                        {activeModal === 'delete' && (
                            <div className="bg-surface-container-lowest p-6 rounded-xl border-2 border-error shadow-md transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-error" style={{ fontFamily: 'Bricolage Grotesque' }}>Zona de Peligro</h3>
                                    <button onClick={() => setActiveModal(null)} className="material-symbols-outlined text-on-surface-variant hover:text-error">close</button>
                                </div>
                                <DeleteUserForm />
                            </div>
                        )}

                        {/* Bento Grid de Progreso del Alumno */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Nivel Card Dinámico */}
                            <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant flex flex-col justify-between relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 text-secondary/10 transform rotate-12 transition-transform group-hover:rotate-0 pointer-events-none">
                                    <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold bg-secondary text-white px-3 py-1 rounded-full inline-block mb-4">Nivel Actual</h3>
                                    <div className="text-4xl font-extrabold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        Nivel {profile.level}
                                    </div>
                                </div>
                                <div className="mt-6 z-10">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>Progreso al Nivel {profile.level + 1}</span>
                                        <span className="font-bold">{profile.level_progress}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/50">
                                        <div 
                                            className="bg-secondary h-full rounded-full transition-all duration-500" 
                                            style={{ width: `${profile.level_progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Estrellas Card Dinámico */}
                            <div className="bg-tertiary-fixed p-6 rounded-xl border border-outline-variant flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-tertiary-fixed text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-on-tertiary-fixed-variant">Estrellas Ganadas</p>
                                    <h4 className="text-3xl font-bold text-on-tertiary-fixed" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        {profile.stars}
                                    </h4>
                                </div>
                            </div>

                            {/* Actividad Card Dinámico */}
                            <div className="bg-secondary-fixed p-6 rounded-xl border border-outline-variant flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-on-secondary-fixed flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-secondary-fixed text-[40px]">menu_book</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-on-secondary-fixed-variant">Actividad</p>
                                    <h4 className="text-2xl font-bold text-on-secondary-fixed" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                        {profile.stories_read} {profile.stories_read === 1 ? 'Cuento Leído' : 'Cuentos Leídos'}
                                    </h4>
                                </div>
                            </div>

                            {/* Motivación Card */}
                            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant border-dashed flex flex-col items-center justify-center text-on-surface-variant gap-2 text-center">
                                <span className="material-symbols-outlined text-[32px] text-primary">emoji_events</span>
                                <p className="text-sm font-semibold">¡Sigue así! Tu camino apenas comienza.</p>
                            </div>
                        </div>

                        {/* Insignias Logradas Dinámicas */}
                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
                            <h2 className="text-xl font-bold text-on-surface mb-6" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                Insignias Logradas ({badges.length})
                            </h2>
                            
                            {badges.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {badges.map((badge, idx) => (
                                        <div key={badge.id || idx} className="flex flex-col items-center gap-2 group text-center">
                                            <div className="w-20 h-20 rounded-full bg-secondary-container border-4 border-secondary flex items-center justify-center relative transition-all duration-500 group-hover:rotate-12">
                                                <span className="material-symbols-outlined text-secondary text-[36px]">
                                                    {badge.icon_name || 'workspace_premium'}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold text-secondary">{badge.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-4 opacity-60">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-20 h-20 rounded-full bg-surface-container-high border-4 border-outline-variant flex items-center justify-center">
                                            <span className="material-symbols-outlined text-outline text-[36px]">grass</span>
                                        </div>
                                        <span className="text-xs font-bold text-outline">Semilla</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-20 h-20 rounded-full bg-surface-container-high border-4 border-outline-variant flex items-center justify-center">
                                            <span className="material-symbols-outlined text-outline text-[36px]">eco</span>
                                        </div>
                                        <span className="text-xs font-bold text-outline">Brote</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-20 h-20 rounded-full bg-surface-container-high border-4 border-outline-variant flex items-center justify-center">
                                            <span className="material-symbols-outlined text-outline text-[36px]">psychology</span>
                                        </div>
                                        <span className="text-xs font-bold text-outline">Raíz</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}