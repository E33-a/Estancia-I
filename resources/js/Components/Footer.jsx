export default function Footer() {
    return (
        <footer className="w-full mt-auto bg-surface-container-low dark:bg-inverse-surface border-t border-outline-variant">
            <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-6 max-w-7xl mx-auto gap-6">
                <div className="text-center md:text-left">
                    <h5 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-2" style={{ fontFamily: 'Bricolage Grotesque' }}>
                        Raíces Vivas
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant">
                        © 2026 Raíces Vivas. Preservando lenguas, celebrando herencia.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    <a className="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="#">Sobre Nosotros</a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="#">Privacidad</a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="#">Términos</a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="#">Padres</a>
                </div>
            </div>
        </footer>
    );
}