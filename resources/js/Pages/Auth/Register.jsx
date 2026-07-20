import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register() {
    // Agregamos 'role' y 'avatar' al formulario por si deseas procesarlos en el backend
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'student', // rol por defecto
        avatar: 'axolotl', // avatar por defecto
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
            <Head title="Raíces Vivas - Registro" />

            {/* Carga de Fuentes e Iconos de Google (Opcional si ya los tienes en tu app.blade.php) */}
            <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Montserrat:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            
            {/* Estilos embebidos requeridos para los patrones y scrollbars customizados */}
            <style>{`
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
                .otomi-pattern {
                    background-image: radial-gradient(#dcc0ba 0.5px, transparent 0.5px);
                    background-size: 24px 24px;
                    opacity: 0.15;
                }
                .btn-press:active { transform: translateY(2px); box-shadow: none !important; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #dcc0ba; border-radius: 10px; }
            `}</style>

            {/* TopAppBar */}
            <header className="w-full top-0 sticky z-50 bg-surface border-b-2 border-outline-variant shadow-sm">
                <div className="flex justify-between items-center w-full px-4 md:px-10 py-3 max-w-7xl mx-auto">
                    <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>Raíces Vivas</div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat' }} href="#">Lecciones</a>
                        <a className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat' }} href="#">Vocabulario</a>
                        <a className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat' }} href="#">Cultura</a>
                        <a className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat' }} href="#">Progreso</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="material-symbols-outlined text-primary p-1 active:scale-95 transition-transform">language</button>
                        <button className="material-symbols-outlined text-primary p-1 active:scale-95 transition-transform">settings</button>
                        <Link href={route('login')} className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold active:scale-95 transition-all shadow-sm">Acceder</Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow relative flex items-center justify-center py-8 overflow-hidden">
                {/* Background Pattern Decorations */}
                <div className="absolute inset-0 otomi-pattern pointer-events-none"></div>
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-fixed opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-fixed opacity-10 rounded-full blur-3xl"></div>
                
                <div className="container max-w-6xl mx-auto px-4 md:px-10 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-xl shadow-lg border border-outline-variant overflow-hidden">
                        
                        {/* Left: Illustration & Welcome */}
                        <div className="hidden lg:flex flex-col justify-center items-center p-8 bg-surface-container text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 border-t-4 border-dashed border-primary-container opacity-20"></div>
                            <div className="w-full max-w-sm mb-6 aspect-square rounded-full overflow-hidden border-8 border-surface-container-high shadow-xl transform rotate-1">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhFj3m7tY-rvsHVKz_pdBiXPc8dblp2a9jpvIXYBHKZGMItSk630DC2aZNy-aHgQLYFf6PkOtSej6lYwEqGrBh3H3qTkAF6KjyZF3qj1Xf0PhPBJt3FUoL0AGRBe94WdukclDZlTmC6wJAa8HD__4HZ3SmXYnb0cc7BBidpn3a_MUb_iflkWQGYtMSrlzrxImKESqQRcNqGjD6DJplOX3CoDjgtVTlgUXP7b9hLhy6wsC0I5MnXP7E" alt="Ilustración Raíces Vivas" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-4" style={{ fontFamily: 'Bricolage Grotesque' }}>Comienza tu viaje</h2>
                            <p className="text-lg text-on-surface-variant px-6" style={{ fontFamily: 'Montserrat' }}>Únete a una comunidad dedicada a revitalizar nuestras lenguas ancestrales y celebrar la herencia mexicana.</p>
                            <div className="mt-8 flex gap-4">
                                <div className="p-3 bg-surface-container-highest rounded-lg border border-outline-variant">
                                    <span className="material-symbols-outlined text-primary block mb-1">school</span>
                                    <span className="text-xs font-medium block">Aprende</span>
                                </div>
                                <div className="p-3 bg-surface-container-highest rounded-lg border border-outline-variant">
                                    <span className="material-symbols-outlined text-secondary block mb-1">diversity_3</span>
                                    <span className="text-xs font-medium block">Conecta</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Registration Form */}
                        <div className="p-6 lg:p-8 flex flex-col">
                            <div className="mb-6">
                                <h1 className="text-2xl font-semibold text-on-surface mb-1" style={{ fontFamily: 'Bricolage Grotesque' }}>Crear Cuenta</h1>
                                <p className="text-sm text-on-surface-variant">Regístrate para empezar tu aprendizaje cultural hoy.</p>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                {/* Role Selection (Controlled State via Inertia) */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-on-surface-variant">¿Quién eres?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button 
                                            type="button"
                                            onClick={() => setData('role', 'student')}
                                            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${data.role === 'student' ? 'border-primary bg-primary-fixed text-on-primary-fixed-variant' : 'border-outline-variant'}`}
                                        >
                                            <span className="material-symbols-outlined mb-1">face</span>
                                            <span className="text-sm font-semibold">Estudiante</span>
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setData('role', 'teacher')}
                                            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${data.role === 'teacher' ? 'border-primary bg-primary-fixed text-on-primary-fixed-variant' : 'border-outline-variant'}`}
                                        >
                                            <span className="material-symbols-outlined mb-1">psychology</span>
                                            <span className="text-sm font-semibold">Maestro</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Basic Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-on-surface-variant block mb-1" htmlFor="name">Nombre Completo</label>
                                        <input 
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-surface-bright"
                                            placeholder="Tu nombre"
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            autoComplete="name"
                                        />
                                        <InputError message={errors.name} className="mt-1" />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-on-surface-variant block mb-1" htmlFor="email">Correo Electrónico</label>
                                        <input 
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-surface-bright"
                                            placeholder="email@ejemplo.com"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            autoComplete="username"
                                        />
                                        <InputError message={errors.email} className="mt-1" />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-on-surface-variant block mb-1" htmlFor="password">Contraseña</label>
                                        <input 
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors bg-surface-bright"
                                            placeholder="********"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            autoComplete="new-password"
                                        />
                                        <InputError message={errors.password} className="mt-1" />
                                    </div>
                                </div>

                                {/* Language Selector (Estático visualmente por ahora) */}
                                <div>
                                    <label className="text-sm font-semibold text-on-surface-variant block mb-1">Idioma que quieres aprender</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button className="px-4 py-1 rounded-full border-2 border-secondary bg-secondary-container text-on-secondary-container text-sm font-semibold" type="button">Spanish</button>
                                        <button className="px-4 py-1 rounded-full border-2 border-outline-variant hover:border-secondary transition-all text-sm font-semibold" type="button">Náhuatl</button>
                                        <button className="px-4 py-1 rounded-full border-2 border-outline-variant hover:border-secondary transition-all text-sm font-semibold" type="button">Otomí</button>
                                    </div>
                                </div>

                                {/* Avatar Selection (Visible solo si el rol seleccionado es Estudiante) */}
                                {data.role === 'student' && (
                                    <div className="space-y-1 transition-all duration-500">
                                        <label className="text-sm font-semibold text-on-surface-variant block">Elige tu Avatar</label>
                                        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar snap-x">
                                            {[
                                                { id: 'axolotl', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiPwXzbU32T2hkzwa0QvpjXl67NOwvIWP1VK78431YJSEQ28v7aqkLHgWW1HtjI9HhWBCVEocu4cA-eoSGEaAv5T0cogtc2pQxJEtXFHwZiiWuyw0XB6aWIWqf5k9QHUa2RQGXzxsqnU4HwMTHfELavOqKAvVIBvcDKVBAbmMLTqAjZgGgxDOFvEKrc91-Y4WELGKz8e3SlO4SBZNekqu5xSlOmcOS9ZXfpimd6cjenE0LVFb8rL8O' },
                                                { id: 'jaguar', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDspi0KInOs50Xoi2uANObW8CVsODgbLAeORJQccmdwqa4h7zroChiWIs8FMjJo5JjuI9m2pkzFBzKibMgco-J7r1PvFTIC7hISLthucTdRASK6hgIJsHpkwQk27DbC1Tnvr6aMSeT8d8_j__bt8agc4WZGX1sc2EGJt2DITf5dFO2XZiiQMPIill-RykTa_Yhn5k2IOVhq-_TJPPU8CePDEkITGiH0lhmA2OWRnSiMO3JaehyYZw4-' },
                                                { id: 'colibri', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGG8Q3phxx35eg7JW61WNrzxcFJ5EGum1z-4se79xFl-33vJ9PLCaWBGVXEWjZTAf-Ps-PxFPm3fqWz8IjQIncxoSgwAoLmukyVp9x7OcxZupYua_gz6YZqR4MePXk5rcm29C3a-Qs-I15fBKsjl0sl-kk39X9uxefBw4DzCrgB7w14kNJXu7K07LQ9yM4pItmfteK3oe2Bo9Sz3eybk5f6XyV8jk9ZNymeIBTQW3-FAG0kDK-BkwZ' },
                                                { id: 'cactus', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAempxvaP42avd6JfvK4BIEIpFg8iLlLm1DGdsSPiZWNg1PJ2xsiLnvAkqUWLpDxv8k3i0oKdRKNbsAnvK4YcTvLk3YDzB2zFSzBbApUVm-u7jHnlcKWx_qtIm9-87D5oveIzI3LeczCsd1fZrDJu6elQNIk-rnm5JwaIZS4gNgoetb7en3kJyfmJKYpfFo3yX1tNC9xV5JxGUvg7bteGlwi9qwmuEBylYpyW6Ukp37_cjdlcflJWbv' },
                                                { id: 'mariposa', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC12CiEqPXFToyS9ffmkjw2x2isKnP7d1hRTNJHETJlFprdlMK0pgRn7Plvs9mJXBFU5Eo2gqLBffwC6RA0pSbpGG-B0FqMMOQezyP-I94C8Bc227v59dlo8KNAGB1BZIhtL2cgeNJsVkgLXEVZ1TwaZy1QEJbOuyEgW5A5lNi9J8BJ6haAfmU2FppvUGmmRs1eotCQyzoYeu2tOHfyFmNSxgDoW_y4BpE-HCAHP6BvIHaNIVJTCdP8' }
                                            ].map((avatarItem) => (
                                                <div key={avatarItem.id} className="flex-shrink-0 snap-center">
                                                    <button 
                                                        type="button"
                                                        onClick={() => setData('avatar', avatarItem.id)}
                                                        className={`w-16 h-16 rounded-full border-4 p-1 bg-surface-container-high transition-transform hover:scale-105 active:scale-95 overflow-hidden ${data.avatar === avatarItem.id ? 'border-primary' : 'border-outline-variant'}`}
                                                    >
                                                        <img className="w-full h-full object-cover rounded-full" src={avatarItem.src} alt={avatarItem.id} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA / Submit Button */}
                                <div className="pt-4 space-y-4">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg shadow-lg btn-press transition-all hover:bg-primary-container border-b-4 border-primary-container/50 disabled:opacity-50"
                                        style={{ fontFamily: 'Bricolage Grotesque' }}
                                    >
                                        {processing ? 'Registrando...' : 'Registrarse'}
                                    </button>
                                    <p className="text-center text-sm text-on-surface-variant">
                                        ¿Ya tienes una cuenta?{' '}
                                        <Link href={route('login')} className="text-primary font-bold hover:underline">
                                            Iniciar Sesión
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full mt-auto bg-surface-container-low border-t border-outline-variant">
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-10 py-6 max-w-7xl mx-auto">
                    <div className="mb-4 md:mb-0">
                        <div className="text-xl font-bold text-on-surface mb-1" style={{ fontFamily: 'Bricolage Grotesque' }}>Raíces Vivas</div>
                        <p className="text-xs text-on-surface-variant">© 2026 Raíces Vivas. Preservando lenguas, celebrando herencia.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a className="text-xs text-on-surface-variant hover:text-primary transition-all" href="#">Privacidad</a>
                        <a className="text-xs text-on-surface-variant hover:text-primary transition-all" href="#">Términos</a>
                        <a className="text-xs text-on-surface-variant hover:text-primary transition-all" href="#">Contacto</a>
                        <a className="text-xs text-on-surface-variant hover:text-primary transition-all" href="#">Sobre Nosotros</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}