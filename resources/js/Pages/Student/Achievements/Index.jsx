import { Head, Link } from "@inertiajs/react";

import { useMemo, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function Index({
  student,
  badges = [],
  recentActivity = [],
  allActivity = [],
}) {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const [showFullHistory, setShowFullHistory] = useState(false);

  const unlockedCount = useMemo(
    () => badges.filter((badge) => badge.unlocked).length,
    [badges],
  );

  const colorClasses = {
    primary: {
      background: "bg-primary-fixed",
      icon: "text-primary",
      bar: "bg-primary",
    },

    secondary: {
      background: "bg-secondary-container",
      icon: "text-secondary",
      bar: "bg-secondary",
    },

    tertiary: {
      background: "bg-tertiary-fixed",
      icon: "text-tertiary",
      bar: "bg-tertiary",
    },
  };

  const getColor = (color) => colorClasses[color] ?? colorClasses.primary;

  return (
    <AuthenticatedLayout>
      <Head title="Mis Logros - Raíces Vivas" />

      <style>{`
        .achievement-pattern {
          background-image:
            radial-gradient(
              circle at 2px 2px,
              rgba(154, 64, 40, 0.05) 1px,
              transparent 0
            );

          background-size:
            24px 24px;
        }

        .achievement-shadow {
          box-shadow:
            0 10px 25px -5px
              rgba(154,64,40,.15),
            0 8px 10px -6px
              rgba(154,64,40,.1);
        }

        .badge-card {
          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .badge-card:hover {
          transform:
            translateY(-5px);
        }
      `}</style>

      <div className="min-h-screen bg-surface achievement-pattern flex flex-col">
        <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-10 py-8">
          {/* Regresar */}
          <div className="mb-6">
            <Link
              href={route("student.dashboard")}
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Volver al Menú Principal
            </Link>
          </div>

          {/* Encabezado */}
          <section className="relative overflow-hidden bg-surface-container-low border-2 border-outline-variant rounded-3xl p-6 md:p-8 achievement-shadow mb-8">
            <div className="absolute -right-10 -top-12 opacity-5 pointer-events-none">
              <span
                className="material-symbols-outlined text-[220px]"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                star
              </span>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary-fixed border-4 border-white shadow-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-6xl">
                    face
                  </span>
                </div>

                <div>
                  <h1
                    className="text-3xl md:text-4xl font-bold text-on-surface"
                    style={{
                      fontFamily: "Bricolage Grotesque",
                    }}
                  >
                    {student.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-bold border border-secondary">
                      Nivel {student.level}
                    </span>

                    <span className="text-on-surface-variant">
                      {student.rank}
                    </span>

                    <span className="text-xs bg-surface-container-high px-3 py-1 rounded-full text-primary font-semibold">
                      {student.dialect}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estrellas */}
              <div className="bg-white/90 rounded-2xl p-5 border-2 border-primary-fixed flex items-center gap-4 shadow-sm">
                <div className="bg-primary-container w-14 h-14 rounded-xl flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-white text-4xl"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    stars
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">
                    Estrellas Totales
                  </p>

                  <p
                    className="text-4xl font-extrabold text-primary leading-none mt-1"
                    style={{
                      fontFamily: "Bricolage Grotesque",
                    }}
                  >
                    {student.stars}
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
              <div className="bg-white/80 rounded-xl p-4 text-center border border-outline-variant">
                <p className="text-2xl font-bold text-primary">
                  {unlockedCount}/{badges.length}
                </p>

                <p className="text-xs text-on-surface-variant">Insignias</p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 text-center border border-outline-variant">
                <p className="text-2xl font-bold text-tertiary">
                  {student.storiesCompleted}
                </p>

                <p className="text-xs text-on-surface-variant">Cuentos</p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 text-center border border-outline-variant">
                <p className="text-2xl font-bold text-secondary">
                  {student.assessmentsPassed}
                </p>

                <p className="text-xs text-on-surface-variant">
                  Evaluaciones aprobadas
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 text-center border border-outline-variant">
                <p className="text-2xl font-bold text-primary">
                  {Math.round(student.bestAssessmentScore ?? 0)}%
                </p>

                <p className="text-xs text-on-surface-variant">Mejor nota</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Insignias */}
            <section className="lg:col-span-8">
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="text-3xl font-bold flex items-center gap-2"
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    workspace_premium
                  </span>
                  Mi Colección de Emblemas
                </h2>
              </div>

              {badges.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {badges.map((badge) => {
                    const colors = getColor(badge.color);

                    return (
                      <button
                        type="button"
                        key={badge.id}
                        onClick={() => setSelectedBadge(badge)}
                        className={`
                            badge-card
                            relative
                            rounded-2xl
                            p-5
                            text-center
                            flex
                            flex-col
                            items-center
                            min-h-[245px]

                            ${
                              badge.unlocked
                                ? "bg-white border-2 border-outline-variant achievement-shadow"
                                : "bg-surface-dim/50 border-2 border-dashed border-outline opacity-75 hover:opacity-100"
                            }
                          `}
                      >
                        <div
                          className={`
                              w-24
                              h-24
                              rounded-full
                              flex
                              items-center
                              justify-center
                              mb-4

                              ${
                                badge.unlocked
                                  ? colors.background
                                  : "bg-surface-container-high"
                              }
                            `}
                        >
                          <span
                            className={`
                                material-symbols-outlined
                                text-6xl

                                ${badge.unlocked ? colors.icon : "text-outline"}
                              `}
                            style={{
                              fontVariationSettings: badge.unlocked
                                ? "'FILL' 1"
                                : "'FILL' 0",
                            }}
                          >
                            {badge.unlocked ? badge.icon : "lock"}
                          </span>
                        </div>

                        <h3
                          className={`
                              text-xl
                              font-bold

                              ${
                                badge.unlocked ? "text-primary" : "text-outline"
                              }
                            `}
                          style={{
                            fontFamily: "Bricolage Grotesque",
                          }}
                        >
                          {badge.name}
                        </h3>

                        <p className="text-sm text-on-surface-variant mt-2">
                          {badge.unlocked ? badge.description : "Bloqueado"}
                        </p>

                        {badge.unlocked && (
                          <div className="mt-auto pt-3">
                            <span className="inline-flex items-center gap-1 bg-tertiary-fixed text-tertiary px-3 py-1 rounded-full text-xs font-bold">
                              <span className="material-symbols-outlined text-sm">
                                star
                              </span>
                              +{badge.starsReward}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border border-outline-variant rounded-2xl p-10 text-center">
                  <span className="material-symbols-outlined text-6xl text-outline">
                    workspace_premium
                  </span>

                  <p className="mt-3 text-on-surface-variant">
                    Todavía no hay insignias disponibles.
                  </p>
                </div>
              )}
            </section>

            {/* Historial */}
            <aside className="lg:col-span-4">
              <div className="bg-surface-container rounded-2xl p-6 border-2 border-outline-variant shadow-sm">
                <h2
                  className="text-2xl font-bold flex items-center gap-2 mb-5"
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  <span className="material-symbols-outlined text-secondary">
                    insights
                  </span>
                  Historial Reciente
                </h2>

                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const colors = getColor(activity.color);

                      return (
                        <div
                          key={activity.id}
                          className="bg-white rounded-xl border border-outline-variant p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                                  w-12
                                  h-12
                                  rounded-xl
                                  flex
                                  items-center
                                  justify-center
                                  flex-shrink-0

                                  ${colors.background}
                                `}
                            >
                              <span
                                className={`
                                    material-symbols-outlined
                                    ${colors.icon}
                                  `}
                              >
                                {activity.icon}
                              </span>
                            </div>

                            <div className="flex-grow min-w-0">
                              <p className="font-bold text-sm truncate">
                                {activity.title}
                              </p>

                              <p className="text-xs text-on-surface-variant">
                                {formatDate(activity.date)}
                              </p>

                              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden mt-2">
                                <div
                                  className={`h-full ${colors.bar}`}
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      Math.max(0, activity.score),
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <span
                              className={`
                                  text-xl
                                  font-bold
                                  ${colors.icon}
                                `}
                            >
                              {activity.score}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setShowFullHistory(true)}
                      className="w-full mt-3 py-3 border-2 border-secondary text-secondary font-bold rounded-xl hover:bg-secondary-container transition-colors"
                    >
                      Ver Reporte Completo
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <span className="material-symbols-outlined text-5xl text-outline">
                      history
                    </span>

                    <p className="text-on-surface-variant mt-3">
                      Completa cuentos o evaluaciones para comenzar tu
                      historial.
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </main>

        <Footer />

        {/* Modal insignia */}
        {selectedBadge && (
          <div
            className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setSelectedBadge(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-md w-full p-7 text-center shadow-2xl border-4 border-primary-fixed"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`
                  w-24
                  h-24
                  rounded-full
                  mx-auto
                  flex
                  items-center
                  justify-center

                  ${
                    selectedBadge.unlocked
                      ? getColor(selectedBadge.color).background
                      : "bg-surface-container-high"
                  }
                `}
              >
                <span
                  className={`
                    material-symbols-outlined
                    text-6xl

                    ${
                      selectedBadge.unlocked
                        ? getColor(selectedBadge.color).icon
                        : "text-outline"
                    }
                  `}
                  style={{
                    fontVariationSettings: selectedBadge.unlocked
                      ? "'FILL' 1"
                      : "'FILL' 0",
                  }}
                >
                  {selectedBadge.unlocked ? selectedBadge.icon : "lock"}
                </span>
              </div>

              <h2
                className="text-3xl font-bold mt-5"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                {selectedBadge.name}
              </h2>

              {selectedBadge.unlocked ? (
                <>
                  <p className="text-on-surface-variant mt-3">
                    {selectedBadge.description}
                  </p>

                  <div className="bg-secondary-container text-secondary rounded-xl p-4 mt-5">
                    <p className="font-bold">¡Insignia desbloqueada!</p>

                    {selectedBadge.earnedAt && (
                      <p className="text-sm mt-1">
                        Obtenida el {formatDate(selectedBadge.earnedAt)}
                      </p>
                    )}

                    <p className="text-sm mt-2">
                      +{selectedBadge.starsReward} estrellas
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-on-surface-variant mt-3">
                    Esta insignia aún está bloqueada.
                  </p>

                  <div className="bg-primary-fixed text-on-primary-fixed rounded-xl p-4 mt-5">
                    <p className="font-bold flex justify-center items-center gap-2">
                      <span className="material-symbols-outlined">info</span>
                      ¿Cómo desbloquearla?
                    </p>

                    <p className="mt-2">{selectedBadge.criteria}</p>
                  </div>
                </>
              )}

              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Historial completo */}
        {showFullHistory && (
          <div
            className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setShowFullHistory(false)}
          >
            <div
              className="bg-surface rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="p-6 border-b border-outline-variant flex justify-between items-center">
                <div>
                  <h2
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "Bricolage Grotesque",
                    }}
                  >
                    Historial de Actividad
                  </h2>

                  <p className="text-on-surface-variant">
                    Todos tus resultados registrados.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFullHistory(false)}
                  className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[65vh] space-y-3">
                {allActivity.length > 0 ? (
                  allActivity.map((activity) => {
                    const colors = getColor(activity.color);

                    return (
                      <div
                        key={activity.id}
                        className="bg-white rounded-xl border border-outline-variant p-4 flex items-center gap-4"
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.background}`}
                        >
                          <span
                            className={`material-symbols-outlined ${colors.icon}`}
                          >
                            {activity.icon}
                          </span>
                        </div>

                        <div className="flex-grow">
                          <p className="font-bold">{activity.title}</p>

                          <p className="text-xs text-on-surface-variant">
                            {activity.type === "assessment"
                              ? "Evaluación"
                              : "Cuento"}
                            {" · "}
                            {formatDate(activity.date)}
                          </p>
                        </div>

                        <div className={`text-2xl font-bold ${colors.icon}`}>
                          {activity.score}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-on-surface-variant py-10">
                    Todavía no hay actividad registrada.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
