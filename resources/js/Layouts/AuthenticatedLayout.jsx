import { Link, usePage } from '@inertiajs/react';

export default function Authenticated({ children }) {
    // Obtenemos el usuario autenticado desde el estado global de Inertia
    const user = usePage().props.auth.user;

    // Extraemos la información del perfil del estudiante con fallback si no existe (ej. para Docente/Admin)
    const profile = user?.student_profile || {
        stars: 0,
        stories_read: 0,
        selected_dialect: 'Español'
    };

    // Si tu usuario tiene una colección de insignias asociadas, la leemos, si no usamos historias leídas
    const badgesCount = user?.badges ? user.badges.length : profile.stories_read;

    return (
        <div className="min-h-screen bg-[#fdf7ff]">
            {/* Carga de Fuentes y Símbolos de Google */}
            <link 
                href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" 
                rel="stylesheet" 
            />
            <link 
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" 
                rel="stylesheet" 
            />

            {/* NUEVA BARRA DE NAVEGACIÓN (HEADER) */}
            <header className="w-full top-0 sticky z-50 bg-surface border-b-2 border-outline-variant shadow-sm px-4 md:px-10 py-3 bg-[#fdf7ff]">
                <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
                    
                    {/* Brand & Avatar */}
                    <div className="flex items-center gap-3">
                        <Link href={route('profile.edit')} className="relative group cursor-pointer">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-[#9a4028] overflow-hidden bg-[#ffdbd2]">
                                <img 
                                    className="w-full h-full object-cover" 
                                    alt="Avatar de usuario" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDV_vbS1UcT8yeB4XaPTPwyI3vi6G2BtN7IF5xVsKGU8QndCNsqhXeQlYo51pIkCc-v8hyTa1f3pT9qTlFTTX95tacWeRvtGzRuBNfkdVa5ICZG0_cmOQ9IuHo8xL665zUWliNrYnMfp8T3encfzGdu8ChGjRoJ9AtBMFiWcf-2v5Sn2TyU4WZPIuAn6svCvi5Q67yRCt1AqtXQjGDgh5_2yB2wqAaLli5rC4o46RyOgBtsD1lftjM" 
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#36693e] text-white rounded-full p-1 border-2 border-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-[14px]">edit</span>
                            </div>
                        </Link>
                        <div className="hidden sm:block">
                            <Link href={route('dashboard')}>
                                <h1 className="font-bold text-[#9a4028] text-xl" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                    Raíces Vivas
                                </h1>
                            </Link>
                            <p className="text-xs text-[#56423d] font-medium">
                                ¡Hola, {user ? user.name : 'Usuario'}!
                            </p>
                        </div>
                    </div>

                    {/* Stats, Idioma y Botón de Salir */}
                    <div className="flex items-center gap-2 md:gap-6">
                        {/* Estrellas Dinámicas */}
                        <div className="flex items-center bg-[#ede5f9] rounded-full px-3 py-1 border border-[#dcc0ba]">
                            <span className="material-symbols-outlined text-[#a36700] mr-1 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-sm font-semibold text-[#1d1928]">
                                {profile.stars}
                            </span>
                        </div>

                        {/* Insignias / Medallas Dinámicas */}
                        <div className="flex items-center bg-[#ede5f9] rounded-full px-3 py-1 border border-[#dcc0ba]">
                            <span className="material-symbols-outlined text-[#36693e] mr-1 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                            <span className="text-sm font-semibold text-[#1d1928]">
                                {badgesCount}
                            </span>
                        </div>

                        {/* Selector de Lengua */}
                        <div className="hidden md:flex items-center bg-[#f8f1ff] rounded-xl px-2 py-1 border border-[#dcc0ba]">
                            <span className="material-symbols-outlined text-[#9a4028] mr-2 text-[20px]">language</span>
                            <select 
                                defaultValue={profile.selected_dialect}
                                className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-[#1d1928] py-0 pl-0 pr-8 cursor-pointer"
                            >
                                <option value="Español">Español</option>
                                <option value="Náhuatl">Náhuatl</option>
                                <option value="Otomí">Otomí</option>
                            </select>
                        </div>

                        {/* Botón Salir (Logout) */}
                        <Link
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="flex items-center justify-center w-10 h-10 md:w-auto md:px-4 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors font-semibold text-sm"
                        >
                            <span className="material-symbols-outlined md:mr-2 text-[20px]">logout</span>
                            <span className="hidden md:inline">Salir</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Contenido dinámico de las páginas */}
            <main>{children}</main>
        </div>
    );
}