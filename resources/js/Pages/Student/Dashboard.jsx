import { Head, Link, usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";

export default function Dashboard() {
  // Obtenemos el usuario autenticado desde el estado global de Inertia
  const { auth } = usePage().props;
  const user = auth?.user;

  // Extraemos los datos dinámicos del perfil de estudiante (con valores por defecto por si no se han creado)
  const profile = user?.student_profile || {
    level: 1,
    level_progress: 0,
    stars: 0,
    stories_read: 0,
    selected_dialect: "Español",
  };

  // Colección de insignias/medallas
  const badges = user?.badges || [];

  return (
    <>
      <Head title="Panel del Alumno - Raíces Vivas" />

      {/* Fuentes de Google Fonts y Material Symbols */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
        rel="stylesheet"
      />

      {/* Estilos adicionales personalizados incorporados dinámicamente */}
      <style>{`
                .mexican-pattern {
                    mask-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l5 15h15l-12 9 5 16-13-10-13 10 5-16-12-9h15z' fill='%23000' fill-opacity='1'/%3E%3C/svg%3E");
                    mask-size: 60px;
                    background-color: currentColor;
                    opacity: 0.05;
                }

                .card-hover:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 25px -5px rgba(154, 64, 40, 0.1), 0 10px 10px -5px rgba(154, 64, 40, 0.04);
                }

                .card-hover:hover .icon-animate {
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    transform: scale(1.2) rotate(5deg);
                }

                .press-effect:active {
                    transform: scale(0.95) translateY(2px);
                }

                .floating {
                    animation: float 4s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>

      <div className="font-body-md text-on-background min-h-screen flex flex-col bg-[#fdf7ff]">
        {/* Header Superior */}
        <header className="w-full top-0 sticky z-50 bg-surface dark:bg-surface-dim border-b-2 border-outline-variant shadow-sm px-4 md:px-10 py-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
            {/* Avatar e información de usuario */}
            <div className="flex items-center gap-3">
              <Link
                href={route("profile.edit")}
                className="relative group cursor-pointer"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-primary overflow-hidden bg-primary-fixed">
                  <img
                    className="w-full h-full object-cover"
                    alt="Avatar de Colibrí"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDV_vbS1UcT8yeB4XaPTPwyI3vi6G2BtN7IF5xVsKGU8QndCNsqhXeQlYo51pIkCc-v8hyTa1f3pT9qTlFTTX95tacWeRvtGzRuBNfkdVa5ICZG0_cmOQ9IuHo8xL665zUWliNrYnMfp8T3encfzGdu8ChGjRoJ9AtBMFiWcf-2v5Sn2TyU4WZPIuAn6svCvi5Q67yRCt1AqtXQjGDgh5_2yB2wqAaLli5rC4o46RyOgBtsD1lftjM"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-secondary text-white rounded-full p-1 border-2 border-surface">
                  <span className="material-symbols-outlined text-[14px]">
                    edit
                  </span>
                </div>
              </Link>
              <div className="hidden sm:block">
                <h1
                  className="font-headline-md text-headline-md font-bold text-primary"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  Raíces Vivas
                </h1>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  ¡Hola, {user?.name || "Mateo"}!
                </p>
              </div>
            </div>

            {/* Estadísticas, Lenguaje y Botón de Salir */}
            <div className="flex items-center gap-2 md:gap-6">
              {/* Estrellas dinámicas desde la BD */}
              <div className="flex items-center bg-surface-container-high rounded-full px-3 py-1 border border-outline-variant">
                <span
                  className="material-symbols-outlined text-tertiary-container mr-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-label-lg text-label-lg">
                  {profile.stars}
                </span>
              </div>

              {/* Medallas dinámicas según conteo de la relación pivot */}
              <div className="flex items-center bg-surface-container-high rounded-full px-3 py-1 border border-outline-variant">
                <span
                  className="material-symbols-outlined text-secondary mr-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                <span className="font-label-lg text-label-lg">
                  {badges.length}
                </span>
              </div>

              {/* Selector de Lengua dinámico */}
              <div className="hidden md:flex items-center bg-surface-container-low rounded-xl px-2 py-1 border border-outline-variant">
                <span className="material-symbols-outlined text-primary mr-2">
                  language
                </span>
                <select
                  defaultValue={profile.selected_dialect}
                  className="bg-transparent border-none focus:ring-0 font-label-lg text-label-lg py-0 pl-0 pr-8 cursor-pointer"
                >
                  <option value="Español">Español</option>
                  <option value="Náhuatl">Náhuatl</option>
                  <option value="Otomí">Otomí</option>
                </select>
              </div>

              {/* Botón de Salir funcional (Laravel Breeze POST logout) */}
              <Link
                method="post"
                href={route("logout")}
                as="button"
                className="flex items-center justify-center w-10 h-10 md:w-auto md:px-4 rounded-xl text-error hover:bg-error-container transition-colors press-effect"
              >
                <span className="material-symbols-outlined md:mr-2">
                  logout
                </span>
                <span className="hidden md:inline font-label-lg">Salir</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
          {/* Decoraciones de Fondo */}
          <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 border-8 border-primary rounded-full opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 border-[12px] border-secondary rounded-full opacity-10"></div>
            <div className="absolute top-1/2 left-1/4 mexican-pattern w-full h-40"></div>
          </div>

          {/* Título Principal */}
          <div className="relative z-10 mb-12 text-center md:text-left">
            <h2
              className="font-display-lg text-display-lg text-on-surface mb-2"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              ¿Qué aprenderemos hoy?
            </h2>
            <div className="h-2 w-32 bg-primary rounded-full mx-auto md:mx-0"></div>
          </div>

          {/* Map / Cards Interactivas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10 mb-16">
            {/* Cuentos */}
            <Link
              href={route("stories.index")}
              className="bg-surface-container-lowest rounded-3xl p-6 border-b-4 border-tertiary-container shadow-sm card-hover transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 mb-6 rounded-2xl bg-tertiary-fixed flex items-center justify-center floating">
                <span
                  className="material-symbols-outlined text-[48px] text-tertiary-container icon-animate"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  auto_stories
                </span>
              </div>

              <h3
                className="font-headline-md text-headline-md text-tertiary-container mb-2"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                Cuentos y Lecturas
              </h3>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Viaja por historias mágicas de México.
              </p>

              <div className="mt-auto pt-6 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-tertiary-container text-white px-4 py-2 rounded-full font-label-lg">
                  ¡Leer ahora!
                </span>
              </div>
            </Link>

            {/* Juegos */}
            <Link
              href={route("games.index")}
              className="bg-surface-container-lowest rounded-3xl p-6 border-b-4 border-secondary shadow-sm card-hover transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
            >
              <div
                className="w-24 h-24 mb-6 rounded-2xl bg-secondary-fixed flex items-center justify-center floating"
                style={{ animationDelay: "0.5s" }}
              >
                <span
                  className="material-symbols-outlined text-[48px] text-secondary icon-animate"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sports_esports
                </span>
              </div>
              <h3
                className="font-headline-md text-headline-md text-secondary mb-2"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                Juegos Interactivos
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Aprende palabras nuevas mientras juegas.
              </p>
              <div className="mt-auto pt-6 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-secondary text-white px-4 py-2 rounded-full font-label-lg">
                  ¡A jugar!
                </span>
              </div>
            </Link>

            {/* Lecciones */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border-b-4 border-primary shadow-sm card-hover transition-all duration-300 cursor-pointer flex flex-col items-center text-center group">
              <div
                className="w-24 h-24 mb-6 rounded-2xl bg-primary-fixed flex items-center justify-center floating"
                style={{ animationDelay: "1s" }}
              >
                <span
                  className="material-symbols-outlined text-[48px] text-primary icon-animate"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
              </div>
              <h3
                className="font-headline-md text-headline-md text-primary mb-2"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                Lecciones
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sigue tu camino para ser un experto (Nivel {profile.level}).
              </p>
              <div className="mt-auto pt-6 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-primary text-white px-4 py-2 rounded-full font-label-lg">
                  Continuar
                </span>
              </div>
            </div>

            {/* Evaluaciones */}
            <Link
              href={route("assessments.index")}
              className="bg-surface-container-lowest rounded-3xl p-6 border-b-4 border-outline shadow-sm card-hover transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
            >
              <div
                className="w-24 h-24 mb-6 rounded-2xl bg-surface-container flex items-center justify-center floating"
                style={{
                  animationDelay: "1.5s",
                }}
              >
                <span
                  className="material-symbols-outlined text-[48px] text-outline icon-animate"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  assignment
                </span>
              </div>

              <h3
                className="font-headline-md text-headline-md text-outline mb-2"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                Mis Evaluaciones
              </h3>

              <p className="font-body-md text-body-md text-on-surface-variant">
                ¿Qué tanto has aprendido esta semana?
              </p>

              <div className="mt-auto pt-6 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-outline text-white px-4 py-2 rounded-full font-label-lg">
                  Ver retos
                </span>
              </div>
            </Link>
          </div>

          {/* Sección Logros */}
          <div className="max-w-2xl mx-auto">
            <Link
              href={route("achievements.index")}
              className="w-full bg-primary-container text-on-primary-container p-6 rounded-3xl flex items-center justify-between shadow-lg hover:shadow-xl transition-all press-effect group"
            >
              <div className="flex items-center text-left">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                  <span className="material-symbols-outlined text-white text-[32px]">
                    emoji_events
                  </span>
                </div>

                <div>
                  <h4
                    className="font-headline-md text-headline-md text-white"
                    style={{
                      fontFamily: "Bricolage Grotesque",
                    }}
                  >
                    Mis Logros
                  </h4>

                  <p className="font-body-md text-white/80">
                    {badges.length > 0
                      ? `Has desbloqueado ${badges.length} medallas hasta ahora.`
                      : "¡Completa actividades para desbloquear medallas!"}
                  </p>
                </div>
              </div>

              <div className="bg-white text-primary-container rounded-full p-2 group-hover:translate-x-2 transition-transform">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </Link>
          </div>
        </main>

        {/* Navegación Móvil Inferior */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant flex justify-around items-center py-3 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <Link
            href={route("dashboard")}
            className="flex flex-col items-center gap-1 text-primary"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              home
            </span>
            <span className="text-[10px] font-label-sm uppercase">Inicio</span>
          </Link>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-on-surface-variant"
          >
            <span className="material-symbols-outlined">explore</span>
            <span className="text-[10px] font-label-sm uppercase">
              Explorar
            </span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-on-surface-variant"
          >
            <span className="material-symbols-outlined">
              social_leaderboard
            </span>
            <span className="text-[10px] font-label-sm uppercase">Podio</span>
          </a>
          <Link
            href={route("profile.edit")}
            className="flex flex-col items-center gap-1 text-on-surface-variant"
          >
            <span className="material-symbols-outlined">account_circle</span>
            <span className="text-[10px] font-label-sm uppercase">Perfil</span>
          </Link>
        </nav>

        {/* Componente de Footer reutilizable */}
        <Footer />
      </div>
    </>
  );
}
