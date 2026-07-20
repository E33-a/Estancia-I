import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="bg-background font-body-md text-on-background min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
            <Head title="¿Olvidaste tu contraseña? - Raíces Vivas" />

            {/* Inyección de fuentes globales de Google Fonts y Material Symbols */}
            <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet" />

            {/* Estilos CSS embebidos basados en tu diseño */}
            <style>{`
                .pattern-overlay {
                    background-color: #fdf7ff;
                    background-image: radial-gradient(#9a4028 0.5px, transparent 0.5px);
                    background-size: 24px 24px;
                    opacity: 0.15;
                }
                .btn-press:active {
                    transform: scale(0.98);
                }
            `}</style>

            {/* Header (Shared Component) */}
            <header className="bg-background w-full px-6 md:px-10 py-4 max-w-7xl mx-auto border-b-2 border-outline-variant/30 sticky top-0 z-50">
                <div className="flex justify-between items-center w-full">
                    <h1 className="font-headline-md text-2xl font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                        Raíces Vivas
                    </h1>
                    <div className="flex items-center gap-4">
                        <button type="button" className="material-symbols-outlined text-primary hover:text-primary-container transition-colors">
                            help
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Canvas */}
            <main className="flex-grow flex items-center justify-center relative py-12 px-5 overflow-hidden">
                {/* Atmospheric Background Element */}
                <div className="absolute inset-0 pattern-overlay pointer-events-none"></div>

                {/* Recovery Card */}
                <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-[0_12px_40px_-12px_rgba(154,64,40,0.15)] overflow-hidden border border-outline-variant/50 z-10">
                    
                    {/* Decorative top border */}
                    <div className="h-2 w-full bg-gradient-to-r from-[#9a4028] to-[#36693e]"></div>
                    
                    <div className="p-6 md:p-8">
                        <div className="space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-on-surface" style={{ fontFamily: 'Bricolage Grotesque' }}>
                                    ¿Olvidaste tu contraseña?
                                </h2>
                                <p className="text-on-surface-variant font-body-md text-sm md:text-base">
                                    No te preocupes. Dinos tu dirección de correo electrónico y te enviaremos un enlace de recuperación para elegir una nueva.
                                </p>
                            </div>

                            {/* Banner de estado de Laravel (Enlace enviado correctamente) */}
                            {status && (
                                <div className="p-4 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6 pt-2">
                                <div className="space-y-2 transition-transform duration-200 focus-within:scale-[1.01]">
                                    <label className="font-label-lg text-sm font-semibold text-on-surface-variant" htmlFor="email">
                                        Correo electrónico
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
                                            placeholder="ejemplo@raiz.com" 
                                            autoFocus
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 transition-all font-body-md bg-transparent text-on-surface placeholder:text-outline/50"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-2 text-sm" />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-primary hover:bg-[#b9573e] text-white py-3 px-6 rounded-lg font-bold btn-press shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    style={{ fontFamily: 'Bricolage Grotesque' }}
                                >
                                    {processing ? 'Enviando enlace...' : 'Enviar enlace de recuperación'}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </form>
                        </div>

                        {/* Return to Login */}
                        <div className="mt-8 text-center">
                            <Link 
                                href={route('login')} 
                                className="inline-flex items-center gap-2 text-on-surface-variant font-semibold hover:text-primary transition-colors text-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer (Shared Component) */}
            <footer className="bg-surface-container-lowest border-t border-outline-variant/30 mt-auto z-10">
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-10 py-6 max-w-7xl mx-auto gap-4">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-xl font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>Raíces Vivas</span>
                        <p className="text-on-surface-variant text-xs">© 2026 Raíces Vivas. Preservando lenguas, cultivando futuro.</p>
                    </div>
                    <div className="flex gap-6 text-xs font-semibold">
                        <a className="text-on-surface-variant hover:underline hover:text-primary transition-colors" href="#">Privacidad</a>
                        <a className="text-on-surface-variant hover:underline hover:text-primary transition-colors" href="#">Términos</a>
                        <a className="text-on-surface-variant hover:underline hover:text-primary transition-colors" href="#">Soporte</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}