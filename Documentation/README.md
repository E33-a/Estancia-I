# Documentación del Proyecto Yoliztli - Estancia I

Este directorio contiene toda la documentación técnica, arquitectónica y de diseño relacionada con el sistema Yoliztli, una plataforma educativa interactiva bilingüe (Español - Náhuatl/Otomí) para niños y docentes.

## Contenido del Directorio

### 1. Documentos de Referencia (PDFs provistos)
*   **`1.SRS_Yoliztli (1).pdf`**: Especificación de Requisitos de Software (SRS) siguiendo el estándar IEEE 830. Define el alcance, los objetivos pedagógicos y los requisitos funcionales (RF1 a RF8).
*   **`2.Arquitectura_Yoliztli.pdf`**: Documento técnico de arquitectura del sistema.
*   **`3.Dise-oInterfaces_Yoliztli.pdf`**: Bocetos e interfaces de usuario preliminares de la plataforma (pantallas de inicio, menú de alumnos y panel docente).
*   **`5.Pruebas Yoliztli.pdf`**: Planificación de casos de prueba y validación del sistema.

### 2. Reporte Académico en LuaLaTeX
*   **`reporte.tex`**: Plantilla oficial y estructurada en LaTeX optimizada para compilarse con el motor **LuaLaTeX**. Este documento recopila la justificación, matriz de requisitos, patrones de arquitectura de diseño implementados en Laravel + React y conclusiones del proyecto.

---

## Instrucciones para Compilar `reporte.tex` con LuaLaTeX

Dado que el documento utiliza el paquete `fontspec` para la gestión tipográfica avanzada de fuentes del sistema Linux (como *Liberation Serif* y *Liberation Sans*), se requiere compilarlo usando **LuaLaTeX** en lugar de pdfLaTeX tradicional.

### Requisitos Previos en Linux (Ubuntu/Debian/Fedora)
Asegúrate de tener instalada una distribución de LaTeX completa (como TeX Live):

```bash
# En Ubuntu / Debian / Pop!_OS
sudo apt update
sudo apt install texlive-latex-extra texlive-fonts-recommended texlive-lang-spanish texlive-luatex

# Instalar fuentes Liberation si no están instaladas
sudo apt install fonts-liberation
```

### Compilación desde Terminal
Ejecuta el siguiente comando dentro de esta carpeta para compilar y generar el PDF:

```bash
lualatex reporte.tex
```

*(Nota: Puede ser necesario ejecutar el comando dos veces para que las referencias cruzadas y el índice de contenidos se actualicen correctamente).*

### Compilación en Editores (VS Code, TeXstudio, Overleaf)
*   **VS Code (con LaTeX Workshop):** Configura la herramienta por defecto como `lualatex` en tu archivo `settings.json` o selecciona "Recipe: LuaLaTeX" en la barra lateral.
*   **Overleaf:** Ve al menú lateral izquierdo (icono de engranaje/menú), busca "Compilador" (Compiler) y cámbialo de *pdfLaTeX* a *LuaLaTeX*.

---

## Relación entre Documentación y Arquitectura del Código

La estructura de carpetas del proyecto se mapea directamente con la arquitectura explicada en el Capítulo 3 de `reporte.tex`:

| Módulo en Documentación | Ubicación en el Código | Propósito Técnico |
| :--- | :--- | :--- |
| **Modelos de Datos** | `app/Models/` | Representación de entidades de base de datos (`User`, `Video`, `Story`, `Progress`). |
| **Controladores** | `app/Http/Controllers/` | Recepción de solicitudes, lógica intermedia y puente de datos a través de Inertia.js. |
| **Rutas y Autenticación** | `routes/` | Rutas web y autenticación por Breeze (`routes/web.php` y `routes/auth.php`). |
| **Migraciones de Base de Datos** | `database/migrations/` | Definición de esquemas de tablas SQLite (videos, progresos, usuarios). |
| **Frontend React** | `resources/js/` | Componentes SPA reactivos de la aplicación. |
