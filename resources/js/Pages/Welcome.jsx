import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Welcome({ auth }) {
    // Control de selección de idioma usando React State (reemplaza el tag <script> antiguo)
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleLanguageClick = (lang) => {
        setSelectedLanguage(lang);
    };

    return (
        <>
            <Head title="Raíces Vivas - Bienvenida" />

            {/* Barra de Navegación Superior */}
            <nav className="sticky top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant px-margin-mobile md:px-margin-tablet py-base">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-md">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-primary-fixed overflow-hidden p-1">
                            <img alt="Logo" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByVo-nwucOy85kw5QECKjsEOFW3Q5gb9tiClHde55td8hiE-BG24hVW6JvdAweA7fGDBVl5agbIAI7WZj2HFMsRbVb9X_PahUXbygb9Z8hWHLif1uBb6U1LpO6l48Lqg447MUJ0yd-NBUqZvHF1U9zuZXoYpqlKy-Bm5LKLtkY4c1-d9auVoObE253z4XS-YaHUmgJaOQOVaiqWp7NKlbT3cFQuSWbiyglJW6Vy5_wy9wnUdj9OPse" />
                        </div>
                        <span className="font-headline-md text-primary tracking-tight">Raíces Vivas</span>
                    </div>
                    <div className="flex items-center gap-lg">
                        <button className="font-label-lg text-secondary hover:text-primary transition-colors">Explorar</button>
                        <button className="font-label-lg text-secondary hover:text-primary transition-colors">Cultura</button>
                        
                        {/* BOTÓN ACCEDER (NAV) */}
                        <Link href={route('login')} className="bg-primary text-on-primary px-lg py-base rounded-full font-label-lg uppercase tracking-widest hover:bg-primary-container transition-all">
                            Acceder
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Encabezado Decorativo */}
            <header className="relative w-full h-48 md:h-64 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 otomí-pattern"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-fixed overflow-hidden p-2">
                        <img className="w-full h-full object-contain" alt="Emblema Raíces Vivas" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByVo-nwucOy85kw5QECKjsEOFW3Q5gb9tiClHde55td8hiE-BG24hVW6JvdAweA7fGDBVl5agbIAI7WZj2HFMsRbVb9X_PahUXbygb9Z8hWHLif1uBb6U1LpO6l48Lqg447MUJ0yd-NBUqZvHF1U9zuZXoYpqlKy-Bm5LKLtkY4c1-d9auVoObE253z4XS-YaHUmgJaOQOVaiqWp7NKlbT3cFQuSWbiyglJW6Vy5_wy9wnUdj9OPse" />
                    </div>
                    <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mt-4 tracking-tight">Raíces Vivas</h1>
                </div>
                <div className="absolute top-4 left-4 opacity-20 transform -rotate-12">
                    <span className="material-symbols-outlined text-6xl text-primary">local_florist</span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-20 transform rotate-12">
                    <span className="material-symbols-outlined text-6xl text-secondary">eco</span>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-grow px-margin-mobile md:px-margin-tablet mx-auto w-full py-base max-w-7xl">
                <section className="text-center mb-lg">
                    <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background mb-xs md:text-6xl">¡Bienvenido!</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">Elige tu lengua para comenzar tu viaje</p>
                </section>

                {/* Grid Selector de Idiomas */}
                <div className="grid grid-cols-1 gap-md mb-xl md:grid-cols-3">
                    {/* Español */}
                    <button 
                        onClick={() => handleLanguageClick('es')}
                        className={`group relative flex items-center p-lg bg-surface-container-lowest rounded-xl border sunset-shadow transition-all hover:scale-[1.02] active:scale-95 text-left w-full ${selectedLanguage === 'es' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant'}`}
                    >
                        <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden mr-lg shrink-0">
                            <img className="w-10 h-10 object-contain" alt="Español" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChe4xJmhvLNeAKYu9gMxqJWttZ41XU-QYIjYZ0KF_DdQn4EnpPozLqrVaEwFO43YfAhinfgBE1ycX44ZVlMaKJaFg1inJoZBEprxgjngsUPTbRi0GnH723bmVkQf-Pwx4nm95vju0w4R-UkPkL8h7ys6h6gc6dELPrK2fQR3Kj9WXw3YHoZ4CpbOYcW1FpDJLpOSvmS1e8wQcfKgEvFz8S48KUMfScibKkA2Zj5JZWGD__3z0xLaNI" />
                        </div>
                        <div className="flex-grow">
                            <span className="font-label-lg text-label-lg text-outline uppercase tracking-widest block mb-1">Tradicional</span>
                            <h3 className="font-headline-md text-headline-md text-on-surface">Español</h3>
                        </div>
                        <div className="bg-primary-container text-on-primary-container p-2 rounded-full flex items-center justify-center transition-colors group-hover:bg-primary">
                            <span className="material-symbols-outlined">volume_up</span>
                        </div>
                    </button>

                    {/* Náhuatl */}
                    <button 
                        onClick={() => handleLanguageClick('na')}
                        className={`group relative flex items-center p-lg bg-surface-container-lowest rounded-xl border sunset-shadow transition-all hover:scale-[1.02] active:scale-95 text-left w-full ${selectedLanguage === 'na' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant'}`}
                    >
                        <div className="w-16 h-16 rounded-lg bg-secondary-container/30 flex items-center justify-center overflow-hidden mr-lg shrink-0">
                            <img className="w-10 h-10 object-contain" alt="Náhuatl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeeMI9qaXhZX6lWn1OTkMYHnbEs5eIDGOXttIdJW7zdBeFwDoJ1u5AhJJJYOy0b5KSDddymxuagLHPPFw7beVMSWWOTtqOhums6cVxJztKX_e1a4Zyhvt5lbP863aPYNmK7-DBhMPOWU2todIiKCRS1mtw_cKdKVEh9pdRuoXLnXs1xDgC9MbNiR-ew2vfC01EBK6gHdj9mzbOYnXyFm4OV1DoxPV96_motaEJGmI4R0Fj6PSvxJ-1" />
                        </div>
                        <div className="flex-grow">
                            <span className="font-label-lg text-label-lg text-outline uppercase tracking-widest block mb-1">Huehuehtlahtolli</span>
                            <h3 className="font-headline-md text-headline-md text-on-surface">Náhuatl</h3>
                        </div>
                        <div className="bg-secondary text-white p-2 rounded-full flex items-center justify-center transition-colors group-hover:bg-on-secondary-container">
                            <span className="material-symbols-outlined">play_arrow</span>
                        </div>
                    </button>

                    {/* Otomí */}
                    <button 
                        onClick={() => handleLanguageClick('ot')}
                        className={`group relative flex items-center p-lg bg-surface-container-lowest rounded-xl border sunset-shadow transition-all hover:scale-[1.02] active:scale-95 text-left w-full ${selectedLanguage === 'ot' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant'}`}
                    >
                        <div className="w-16 h-16 rounded-lg bg-tertiary-fixed/30 flex items-center justify-center overflow-hidden mr-lg shrink-0">
                            <img className="w-10 h-10 object-contain" alt="Otomí" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-zkFNNBsRBVZHIMXVEtnc5fjKvwsQej5knn1VZ5w0zFLtrlwL_QpJb5bXiVUYWuQKANT-vnumVED3eiRbfpZiEfWuPptTzDRtP52AxTHqd_SQ6rvIR_bQdl0_51dWvTvbSa5GL1ve77Fndu9p_KbrbKUznJvW3qB35zyoaVZfcNXyfnXTuZMZHvcvmF84cKKNf0wrMu9uQkW61kIaV7MQryI-iC7rRqjXT-hoERnsDNIB_wnUJ9Dx" />
                        </div>
                        <div className="flex-grow">
                            <span className="font-label-lg text-label-lg text-outline uppercase tracking-widest block mb-1">Hñähñu</span>
                            <h3 className="font-headline-md text-headline-md text-on-surface">Otomí</h3>
                        </div>
                        <div className="bg-tertiary-container text-on-tertiary-container p-2 rounded-full flex items-center justify-center transition-colors group-hover:bg-tertiary">
                            <span className="material-symbols-outlined">volume_up</span>
                        </div>
                    </button>
                </div>

                {/* BOTONES PRINCIPALES ENLAZADOS A LAS RUTAS DE LARAVEL */}
                <div className="flex flex-col gap-md pb-xl md:flex-row md:justify-center">
                    <Link 
                        href={route('register')} 
                        className="w-full text-center bg-primary text-on-primary py-lg rounded-xl font-label-lg text-label-lg uppercase tracking-widest border-press sunset-shadow transition-all hover:bg-primary-container active:scale-95 md:w-64"
                    >
                        Registrarse
                    </Link>
                    
                    <Link 
                        href={route('login')} 
                        className="w-full text-center bg-transparent text-secondary border-2 border-secondary py-lg rounded-xl font-label-lg text-label-lg uppercase tracking-widest transition-all hover:bg-secondary-container/20 active:scale-95 md:w-64"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </main>

            {/* Pie de Página */}
            <footer className="relative w-full py-lg mt-auto overflow-hidden">
                <div className="absolute inset-0 otomí-pattern opacity-5"></div>
                <div className="max-w-7xl mx-auto px-margin-mobile flex flex-col items-center justify-center text-center relative z-10">
                    <p className="font-label-sm text-label-sm text-outline mb-xs">© 2026 Raíces Vivas</p>
                    <div className="flex gap-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-tertiary/30"></div>
                    </div>
                </div>
            </footer>
        </>
    );
}