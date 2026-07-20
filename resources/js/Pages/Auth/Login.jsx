import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Estado para alternar la visibilidad de la contraseña de manera interactiva
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="bg-background min-h-screen relative font-body-md text-on-background flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
            <Head title="Acceder a Raíces Vivas" />

            {/* Inyección opcional de Google Fonts y Material Icons si no se cargan globalmente */}
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* Estilos CSS embebidos requeridos por la plantilla visual */}
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
                .pattern-bg {
                    background-color: #fdf7ff;
                    background-image: radial-gradient(#9a4028 0.5px, transparent 0.5px);
                    background-size: 24px 24px;
                    opacity: 0.15;
                }
                .sunset-shadow {
                    box-shadow: 0 12px 40px -12px rgba(154, 64, 40, 0.15);
                }
                .border-press:active {
                    transform: translateY(2px);
                    box-shadow: none;
                }
                .mexican-border {
                    border-top: 4px solid #9a4028;
                    position: relative;
                }
                .mexican-border::before {
                    content: '';
                    position: absolute;
                    top: -4px;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background-image: linear-gradient(90deg, #9a4028 25%, #36693e 25%, #36693e 50%, #9a4028 50%, #9a4028 75%, #36693e 75%, #36693e 100%);
                    background-size: 40px 4px;
                }
            `}</style>

            {/* TopAppBar Component */}
            <header className="bg-background dark:bg-on-background w-full top-0 sticky shadow-sm z-50">
                <div className="flex justify-between items-center px-6 py-3 w-full max-w-7xl mx-auto">
                    <button className="text-primary dark:text-primary-fixed hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h1 className="font-headline-lg-mobile text-2xl font-bold text-primary dark:text-inverse-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                        Raíces Vivas
                    </h1>
                    <div className="w-10"></div> {/* Placeholder para mantener simetría */}
                </div>
            </header>

            {/* Main Content Canvas */}
            <main className="flex-grow flex items-center justify-center relative px-6 py-10 lg:py-12 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 pattern-bg pointer-events-none"></div>
                
                {/* Login Container */}
                <div className="w-full max-w-5xl grid lg:grid-cols-12 bg-surface-container-lowest rounded-xl overflow-hidden sunset-shadow relative z-10 border border-outline-variant/30">
                    
                    {/* Quick Access / Roles Section (Left) */}
                    <div className="lg:col-span-5 bg-surface-container-low p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-outline-variant/20">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-primary mb-1" style={{ fontFamily: 'Bricolage Grotesque' }}>Quick Access</h2>
                            <p className="text-sm text-on-surface-variant">Selecciona tu perfil o ingresa tus credenciales</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {/* Profile Item: Estudiante */}
                            <button type="button" className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary transition-all active:scale-95 text-left group">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-fixed bg-secondary-fixed/30 flex items-center justify-center">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3amc_YK4Fxrd7_TZ9rBQ2PTNZ-4t0NRllG1NUmaVyV7VGByeqvc4V5k_bKkQ1jr6N9HXfrGw_AX1DewbZBKm_J7Gj7SHBkBmb1d9yoCOBu7A26xpbjhV6IWPVmoINa4IMZxu2wcgfhrHt6idmfijnJky1V-uawNXi9f9fk2U3iVA-fgQ-fX-bfsZhH6TwQIVclPgMnGVwb_eeosTUkbnr2fmcarQAYoLCwvp6STMUgkzLm7qDjp3q" alt="Estudiante" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-on-surface">Estudiante</p>
                                    <p className="text-xs text-on-surface-variant">Mis lenguas y lecciones</p>
                                </div>
                                <span className="material-symbols-outlined ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                            </button>

                            {/* Profile Item: Docente */}
                            <button type="button" className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary transition-all active:scale-95 text-left group">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary-fixed bg-tertiary-fixed/30 flex items-center justify-center">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr925ZJIlRvMiFVs1kn9_xJEKKOWRxVlhpQklU8LeYdRRWMThU2tMPKwBmhabY7YTQt4GJt30PjcQJicKiPv8EoG84oh7TqigPxeMo9MZpYrI__WVlX38UvctQ0Yz5X40iNkwhYOhl_2aMoKLfFYyGCtzQEDX-IA89uZs2l-XF3xXx9Yqo93TCp5-QZ1y9ZEzqnLXKD7xo36-qB4S1DUDcIgTDt5CrDM0DBN_aJKJsD7AKyCpkTyRM" alt="Docente" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-on-surface">Docente</p>
                                    <p className="text-xs text-on-surface-variant">Gestión de aula</p>
                                </div>
                                <span className="material-symbols-outlined ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                            </button>

                            {/* Profile Item: Administrador */}
                            <button type="button" className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary transition-all active:scale-95 text-left group">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-outline-variant bg-surface-variant/30 flex items-center justify-center">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsLUrJX8ek9sJfdn531fjb2TseZ0LjUVc0sssWDxenZrsBykz96Tekl9LgJDe4GwAFQ4c_6fwR0y2gDuwVtVRf4DIXECsapHBzqq-9ozGVB6uWsumHQIvBf2Ivf6mKPhmoh0pkx_mc5UeHvNi2W0G2-Ytpw2pm8RwqMi5S6aKCDN-WVhCklO0VHFhKO8H46b9T40NvLeZnte19iO8ghKGhpTpw5GPx9H05l96rYumZGR1r4zrfvAZV" alt="Administrador" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-on-surface">Administrador</p>
                                    <p className="text-xs text-on-surface-variant">Panel de control</p>
                                </div>
                                <span className="material-symbols-outlined ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                            </button>
                        </div>
                        
                        <div className="mt-8 hidden lg:block">
                            <p className="text-xs text-outline mb-2 italic">"Rescatando nuestras voces para el futuro."</p>
                        </div>
                    </div>

                    {/* Login Form Section (Right) */}
                    <div className="lg:col-span-7 p-8 flex flex-col justify-center relative">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none rotate-12">
                            <span className="material-symbols-outlined text-[120px]">auto_awesome</span>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>Acceder a Raíces Vivas</h3>
                            <p className="text-md text-on-surface-variant mt-1">Bienvenido de nuevo a tu comunidad.</p>
                        </div>

                        {/* Banner de Estado de Sesión (Laravel Breeze Status) */}
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-1 transition-transform duration-200 focus-within:scale-[1.01]">
                                <label htmlFor="email" className="text-sm font-semibold text-on-surface-variant block ml-1">
                                    Email or Username
                                </label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                        person
                                    </span>
                                    <input 
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        placeholder="nombre@ejemplo.com" 
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-surface border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-0 transition-colors placeholder:text-outline/50 text-on-surface"
                                        required
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-1 ml-1" />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1 transition-transform duration-200 focus-within:scale-[1.01]">
                                <div className="flex justify-between items-center px-1">
                                    <label htmlFor="password" className="text-sm font-semibold text-on-surface-variant">Password</label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-xs font-semibold text-secondary hover:underline">
                                            Forgot Password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                        lock
                                    </span>
                                    <input 
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        placeholder="••••••••" 
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 bg-surface border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-0 transition-colors placeholder:text-outline/50 text-on-surface"
                                        required
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors flex items-center"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-1 ml-1" />
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="block pl-1">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-outline-variant text-primary focus:ring-primary/30 w-4 h-4"
                                    />
                                    <span className="ms-2 text-sm text-on-surface-variant">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-[#c25e44] text-white py-3 rounded-xl font-bold text-lg sunset-shadow border-press border-b-4 border-[#9a4028] hover:bg-[#b0533b] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    style={{ fontFamily: 'Bricolage Grotesque' }}
                                >
                                    {processing ? 'Connecting...' : 'Log In'}
                                    <span className="material-symbols-outlined">login</span>
                                </button>
                            </div>

                            {/* Registration / Create Account Link */}
                            <div className="pt-4 text-center">
                                <p className="text-sm text-on-surface-variant">
                                    ¿Eres nuevo aquí? 
                                    <Link href={route('register')} className="text-secondary font-bold hover:text-on-secondary-fixed-variant transition-colors ml-1">
                                        Create Account
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* Help Section */}
                        <div className="mt-8 flex items-center justify-center">
                            <button type="button" className="flex items-center gap-1 text-xs text-outline hover:text-on-surface-variant transition-colors">
                                <span className="material-symbols-outlined text-[18px]">help</span>
                                Need help accessing your account?
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer Decorative Mexican Border */}
            <div className="w-full mexican-border mt-auto"></div>
        </div>
    );
}