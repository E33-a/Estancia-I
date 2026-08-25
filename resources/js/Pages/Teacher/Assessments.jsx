import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Teacher/Sidebar'; // Ajusta la ruta a tu Sidebar

export default function Assessments({ scheduledAssessments = [], pastAssessments = [] }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [questionType, setQuestionType] = useState('multiple');
    const [timerEnabled, setTimerEnabled] = useState(false);

    // Estado para el formulario de la pregunta
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']); // Inicia con 2 campos vacíos

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (indexToRemove) => {
        if (options.length > 2) {
            setOptions(options.filter((_, index) => index !== indexToRemove));
        }
    };

    return (
        <>
            <Head title="Gestión de Evaluaciones - Raíces Vivas" />

            <div className="bg-surface font-body-md text-on-surface min-h-screen flex overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className={`flex-1 transition-all duration-300 h-screen overflow-y-auto otomi-pattern relative ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                    <div className="max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-6">
                        
                        {/* Page Header */}
                        <div className="flex justify-between items-end pb-3 border-b border-outline-variant/30 mb-4">
                            <div>
                                <h2 className="font-headline-lg text-headline-lg font-bold text-on-background mb-1">
                                    Gestión de Evaluaciones
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Crea y administra reactivos y evaluaciones del curso.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Creador de Reactivos */}
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant sunset-shadow-level-1 mayan-border-top p-6 flex flex-col h-full shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-headline-md text-headline-md text-primary font-semibold flex items-center gap-2">
                                            <span className="material-symbols-outlined">neurology</span> 
                                            Creador de Reactivos
                                        </h3>
                                    </div>

                                    {/* Control Segmentado */}
                                    <div className="flex bg-surface-container rounded-lg p-1 mb-6 border border-outline-variant/30">
                                        <button 
                                            onClick={() => setQuestionType('multiple')}
                                            className={`flex-1 py-2 px-4 rounded-md font-label-lg text-label-lg text-center transition-all ${
                                                questionType === 'multiple' 
                                                    ? 'bg-surface text-primary shadow-sm font-semibold' 
                                                    : 'text-on-surface-variant hover:text-on-surface'
                                            }`}
                                        >
                                            Opción Múltiple
                                        </button>
                                        <button 
                                            onClick={() => setQuestionType('text')}
                                            className={`flex-1 py-2 px-4 rounded-md font-label-lg text-label-lg text-center transition-all ${
                                                questionType === 'text' 
                                                    ? 'bg-surface text-primary shadow-sm font-semibold' 
                                                    : 'text-on-surface-variant hover:text-on-surface'
                                            }`}
                                        >
                                            Completar Texto
                                        </button>
                                        <button 
                                            onClick={() => setQuestionType('audio')}
                                            className={`flex-1 py-2 px-4 rounded-md font-label-lg text-label-lg text-center transition-all ${
                                                questionType === 'audio' 
                                                    ? 'bg-surface text-primary shadow-sm font-semibold' 
                                                    : 'text-on-surface-variant hover:text-on-surface'
                                            }`}
                                        >
                                            Audio-preguntas
                                        </button>
                                    </div>

                                    {/* Form Area */}
                                    <div className="flex flex-col gap-4 flex-grow">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-label-lg text-label-lg text-on-surface font-medium">Pregunta / Instrucción</label>
                                            <textarea 
                                                value={question}
                                                onChange={(e) => setQuestion(e.target.value)}
                                                className="w-full bg-surface-container-lowest border-2 border-outline-variant/40 rounded-lg p-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-0 transition-colors resize-none" 
                                                placeholder="Escribe la pregunta aquí..." 
                                                rows="3"
                                            ></textarea>
                                        </div>

                                        <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-lg border border-outline-variant/30">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-secondary">timer</span>
                                                <span className="font-label-lg text-label-lg text-on-surface">Temporizador</span>
                                            </div>
                                            <div 
                                                onClick={() => setTimerEnabled(!timerEnabled)}
                                                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${timerEnabled ? 'bg-secondary' : 'bg-outline-variant'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-surface rounded-full shadow-sm transition-all ${timerEnabled ? 'right-1' : 'left-1'}`}></div>
                                            </div>
                                        </div>

                                        {/* Opciones Dinámicas en Blanco */}
                                        {questionType === 'multiple' && (
                                            <div className="flex flex-col gap-3 mt-2">
                                                <label className="font-label-lg text-label-lg text-on-surface font-medium">Opciones de Respuesta</label>
                                                
                                                {options.map((option, index) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full border-2 border-outline flex items-center justify-center flex-shrink-0"></div>
                                                        <input 
                                                            type="text" 
                                                            value={option}
                                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                                            placeholder={`Opción ${index + 1}`}
                                                            className="flex-1 bg-surface border-2 border-outline-variant/40 rounded-lg p-2 font-body-md focus:border-primary focus:ring-0"
                                                        />
                                                        {options.length > 2 && (
                                                            <button 
                                                                type="button"
                                                                onClick={() => removeOption(index)} 
                                                                className="text-on-surface-variant hover:text-error transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined">close</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}

                                                <button 
                                                    type="button"
                                                    onClick={addOption}
                                                    className="mt-2 self-start flex items-center gap-1 text-secondary font-label-lg text-label-lg hover:underline"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">add</span> Añadir Opción
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex justify-end gap-4">
                                        <button className="px-6 py-2 border-2 border-secondary text-secondary font-label-lg text-label-lg rounded-lg hover:bg-secondary-container/20 hover:text-on-secondary-container transition-colors">
                                            Guardar Borrador
                                        </button>
                                        <button className="px-6 py-2 bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:opacity-90 active:translate-y-[2px] transition-all">
                                            Añadir al Banco
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Lateral Derecha (Estados vacíos) */}
                            <div className="lg:col-span-1 flex flex-col gap-6">
                                
                                {/* Calendario */}
                                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-6 shadow-sm">
                                    <h3 className="font-headline-md text-headline-md text-on-background font-semibold flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-tertiary">calendar_month</span> 
                                        Calendario de Pruebas
                                    </h3>
                                    
                                    {scheduledAssessments.length > 0 ? (
                                        <div className="flex flex-col gap-3">
                                            {/* Mapeo dinámico cuando haya datos */}
                                        </div>
                                    ) : (
                                        <p className="font-body-md text-on-surface-variant text-sm py-4 text-center">
                                            No hay evaluaciones programadas.
                                        </p>
                                    )}
                                </div>

                                {/* Historial */}
                                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-6 flex-grow shadow-sm">
                                    <h3 className="font-headline-md text-headline-md text-on-background font-semibold flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-secondary">history</span> 
                                        Evaluaciones Anteriores
                                    </h3>
                                    
                                    {pastAssessments.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            {/* Mapeo dinámico cuando haya datos */}
                                        </div>
                                    ) : (
                                        <p className="font-body-md text-on-surface-variant text-sm py-4 text-center">
                                            Aún no hay registros de evaluaciones previas.
                                        </p>
                                    )}
                                </div>

                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}