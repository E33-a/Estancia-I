import { useState } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Estados para verificar las condiciones individuales
    const [hasMinLength, setHasMinLength] = useState(false);
    const [hasUpperAndSymbol, setHasUpperAndSymbol] = useState(false);

    const [strength, setStrength] = useState({
        score: 0,
        width: '0%',
        color: 'bg-outline',
        label: 'Muy Débil',
        textColor: '#89726c'
    });

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setData('password', val);

        // Validaciones individuales
        const minLengthOk = val.length >= 8;
        const upperAndSymbolOk = /[A-Z]/.test(val) && /[^A-Za-z0-9]/.test(val);

        setHasMinLength(minLengthOk);
        setHasUpperAndSymbol(upperAndSymbolOk);

        // Cálculo de barra de fuerza
        let score = 0;
        if (minLengthOk) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const widths = ['0%', '25%', '50%', '75%', '100%'];
        const colors = ['bg-outline', 'bg-[#ba1a1a]', 'bg-[#825100]', 'bg-[#36693e]', 'bg-[#36693e]'];
        const labels = ['Muy Débil', 'Débil', 'Media', 'Fuerte', 'Muy Segura'];
        const textColors = ['#89726c', '#ba1a1a', '#825100', '#36693e', '#36693e'];

        setStrength({
            score,
            width: widths[score],
            color: colors[score],
            label: labels[score],
            textColor: textColors[score]
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="bg-[#fdf7ff] font-sans text-[#1d1928] min-h-screen flex flex-col justify-between">
            <Head title="Restablecer Contraseña - Raíces Vivas" />

            <link 
                href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Montserrat:wght@400;500;600&display=swap" 
                rel="stylesheet" 
            />
            <link 
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
                rel="stylesheet" 
            />

            <header className="w-full max-w-7xl mx-auto px-5 md:px-10 py-6 flex justify-center md:justify-start">
                <Link href={route('login')}>
                    <h1 className="text-2xl font-extrabold text-[#9a4028] tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>
                        Raíces Vivas
                    </h1>
                </Link>
            </header>

            <main className="flex-grow flex items-center justify-center px-5 py-8">
                <section className="w-full max-w-md bg-white rounded-xl p-6 md:p-8 shadow-xl border border-[#dcc0ba] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#9a4028] opacity-20"></div>
                    <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
                        <div className="flex space-x-1 justify-center opacity-40">
                            <span className="w-4 h-1 bg-[#9a4028]"></span>
                            <span className="w-8 h-1 bg-[#9a4028]"></span>
                            <span className="w-4 h-1 bg-[#9a4028]"></span>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffdbd2] rounded-full mb-4">
                            <span className="material-symbols-outlined text-[#9a4028] text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                                lock_reset
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1d1928] mb-1" style={{ fontFamily: 'Bricolage Grotesque' }}>
                            Nueva Contraseña
                        </h2>
                        <p className="text-sm text-[#56423d] max-w-xs mx-auto">
                            Crea una contraseña segura para proteger tu conexión con nuestra cultura.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <input type="hidden" name="email" value={data.email} />

                        {/* Campo: Nueva Contraseña */}
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-[#56423d]" htmlFor="password">
                                Nueva Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    className="w-full bg-[#fdf7ff] border-2 border-[#dcc0ba] rounded-lg px-4 py-2 pr-10 focus:border-[#9a4028] focus:ring-0 transition-colors text-sm"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89726c] hover:text-[#9a4028]"
                                >
                                    <span className="material-symbols-outlined text-md">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Medidor de Fuerza + Requisitos en Verde */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-xs text-[#56423d]">Seguridad</span>
                                <span className="text-xs font-bold" style={{ color: strength.textColor }}>
                                    {strength.label}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-[#e7dff3] rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-500 ${strength.color}`} 
                                    style={{ width: strength.width }}
                                ></div>
                            </div>

                            {/* LISTA DE CONDICIONES DINÁMICAS */}
                            <ul className="text-[12px] mt-3 space-y-1.5 list-none pl-1 transition-all duration-300">
                                {/* Condición 1: Mínimo 8 caracteres */}
                                <li className={`flex items-center gap-1.5 font-medium transition-colors duration-300 ${
                                    hasMinLength ? 'text-[#36693e]' : 'text-[#56423d]'
                                }`}>
                                    <span 
                                        className="material-symbols-outlined text-[16px]"
                                        style={{ fontVariationSettings: `'FILL' ${hasMinLength ? 1 : 0}` }}
                                    >
                                        check_circle
                                    </span>
                                    Mínimo 8 caracteres
                                </li>

                                {/* Condición 2: Mayúsculas y símbolos */}
                                <li className={`flex items-center gap-1.5 font-medium transition-colors duration-300 ${
                                    hasUpperAndSymbol ? 'text-[#36693e]' : 'text-[#56423d]'
                                }`}>
                                    <span 
                                        className="material-symbols-outlined text-[16px]"
                                        style={{ fontVariationSettings: `'FILL' ${hasUpperAndSymbol ? 1 : 0}` }}
                                    >
                                        check_circle
                                    </span>
                                    Mayúsculas y símbolos
                                </li>
                            </ul>
                        </div>

                        {/* Campo: Confirmar Contraseña */}
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-[#56423d]" htmlFor="password_confirmation">
                                Confirmar Nueva Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#fdf7ff] border-2 border-[#dcc0ba] rounded-lg px-4 py-2 pr-10 focus:border-[#9a4028] focus:ring-0 transition-colors text-sm"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89726c] hover:text-[#9a4028]"
                                >
                                    <span className="material-symbols-outlined text-md">
                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>

                        {/* Botón de Enviar */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#9a4028] text-white font-semibold text-sm py-3 rounded-lg shadow-md transition-all hover:bg-[#b9573e] border-b-4 border-[#b9573e] flex items-center justify-center gap-2 active:translate-y-0.5 disabled:opacity-50"
                        >
                            {processing ? (
                                <span className="material-symbols-outlined animate-spin text-md">progress_activity</span>
                            ) : (
                                'Actualizar Contraseña'
                            )}
                        </button>

                        <div className="text-center mt-3">
                            <Link
                                href={route('login')}
                                className="text-sm font-semibold text-[#36693e] hover:text-[#1d5129] transition-colors inline-flex items-center gap-1 group"
                            >
                                <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                                    arrow_back
                                </span>
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </section>
            </main>

            <footer className="bg-white border-t border-[#dcc0ba]">
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-6 max-w-7xl mx-auto text-sm text-[#56423d]">
                    <span className="mb-4 md:mb-0">
                        © 2026 Raíces Vivas. Preservando lenguas, cultivando futuro.
                    </span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline hover:text-[#36693e] transition-colors">Privacidad</a>
                        <a href="#" className="hover:underline hover:text-[#36693e] transition-colors">Términos</a>
                        <a href="#" className="hover:underline hover:text-[#36693e] transition-colors">Soporte</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}