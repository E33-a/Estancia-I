# Yoliztli - Sistema Educativo Bilingüe para Lenguas Originarias

Yoliztli es una plataforma web interactiva y educativa diseñada para el aprendizaje infantil de lenguas indígenas (como el náhuatl y el otomí) y para el seguimiento pedagógico por parte de docentes. Está construida sobre una arquitectura moderna que combina **Laravel (PHP) + React (JavaScript) unidos por Inertia.js, con base de datos SQLite (y compatibilidad futura con PostgreSQL)**.

---

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalados los siguientes componentes globales en tu sistema:
*   **PHP** (Versión 8.2 o superior)
*   **Composer** (Gestor de dependencias de PHP)
*   **Node.js** (Versión 18 o superior) e **NPM**
*   **Git**

---

## Guía de Instalación por Sistema Operativo

Sigue las instrucciones correspondientes a tu sistema operativo para configurar el entorno básico:

### Linux (Debian, Fedora, Arch Linux, etc.)

Elige los comandos adecuados según tu distribución base:

#### 1. Debian / Ubuntu / Linux Mint / Pop!_OS (APT)
```bash
# Actualizar repositorios e instalar PHP con sus extensiones, Composer y Node.js/NPM
sudo apt update
sudo apt install -y php-cli php-common php-sqlite3 php-curl php-mbstring php-xml php-zip php-bcmath php-tokenizer composer nodejs npm
```

#### 2. Fedora / Red Hat Enterprise Linux (DNF)
```bash
# Actualizar e instalar PHP, Composer y Node.js/NPM
sudo dnf check-update
sudo dnf install -y php-cli php-common php-sqlite3 php-curl php-mbstring php-xml php-zip php-bcmath php-json composer nodejs npm
```

#### 3. Arch Linux / Manjaro (Pacman)
```bash
# Actualizar sistema e instalar paquetes base
sudo pacman -Syu
sudo pacman -S php php-sqlite composer nodejs npm
```
> **Nota para Arch Linux:** En Arch Linux, debes activar manualmente las extensiones de PHP. Edita tu archivo `/etc/php/php.ini` y descomenta (removiendo el `;` inicial) las siguientes líneas:
> * `extension=curl`
> * `extension=iconv`
> * `extension=mbstring`
> * `extension=openssl`
> * `extension=pdo_sqlite`
> * `extension=sqlite3`

---

### macOS

La forma recomendada es utilizando **Homebrew**:

1.  **Instalar PHP, Composer y Node.js:**
    ```bash
    brew update
    brew install php composer node
    ```
2.  *(Opcional)* Si prefieres un entorno gráfico con todo preconfigurado, puedes descargar **Laravel Herd** para macOS desde [herd.laravel.com](https://herd.laravel.com).

---

### Windows

Existen dos alternativas recomendadas para configurar el entorno en Windows de forma sencilla:

#### Opción A: Laravel Herd (Recomendada - Ultra Rápida)
1.  Descarga e instala **Laravel Herd** desde [herd.laravel.com](https://herd.laravel.com).
2.  Herd instalará automáticamente **PHP**, **Composer** y registrará las rutas de sistema en un solo clic, sin configurar variables de entorno manualmente.
3.  Descarga e instala **Node.js** desde su instalador oficial en [nodejs.org](https://nodejs.org).

#### Opción B: Laragon (Entorno Completo)
1.  Descarga e instala **Laragon Full** desde [laragon.org](https://laragon.org).
2.  Laragon incluye PHP, Apache, Composer, Git y soporte nativo para SQLite y PostgreSQL.
3.  Una vez instalado, abre Laragon y haz clic en "Iniciar todo".

---

## Configuración y Puesta en Marcha del Proyecto

Una vez que tengas configuradas las herramientas en tu sistema, abre una terminal o consola de comandos en el directorio raíz del proyecto y ejecuta la siguiente secuencia de comandos universales:

### 1. Instalar dependencias de Backend (PHP)
```bash
composer install
```

### 2. Configurar el archivo de Entorno
Si no tienes el archivo `.env` en la raíz, cópialo desde la plantilla (el script `restore_project.sh` ya lo genera automáticamente si usaste la restauración):
```bash
cp .env.example .env
```

### 3. Generar la Clave de Seguridad del Proyecto
Esto genera una clave aleatoria en el archivo `.env` requerida para encriptar las sesiones y cookies de usuario:
```bash
php artisan key:generate
```

### 4. Crear y Poblar la Base de Datos (SQLite)
Asegúrate de que el archivo `database.sqlite` esté en el lugar adecuado (`database/database.sqlite`). Luego ejecuta las migraciones para crear las tablas y sembrar los datos iniciales (videos, cuentos y usuarios de prueba):
```bash
php artisan migrate:refresh --seed
```

### 5. Instalar dependencias de Frontend (React)
```bash
npm install
```

### 6. Iniciar Servidores de Desarrollo
Para ver el proyecto funcionando localmente, debes ejecutar dos servidores al mismo tiempo (uno para procesar PHP y otro para compilar React en caliente):

*   **Servidor Backend (Laravel):**
    ```bash
    php artisan serve
    ```
    *(Esto levantará la app en `http://127.0.0.1:8000`)*

*   **Servidor Frontend (Vite/React):**
    ```bash
    npm run dev
    ```
    *(Este servidor se encarga de compilar los componentes de React y aplicar los estilos en tiempo real).*

---

## Arquitectura y Flujo Técnico

El proyecto está organizado bajo los lineamientos del desarrollo limpio en Laravel:

*   **`app/Http/Controllers/`**: Manejo de peticiones.
    *   `Auth/`: Controladores de Login, Registro y Recuperación de contraseña provistos por Laravel Breeze.
    *   `DashboardController.php`: Selecciona recursos aleatorios (cuentos y videos) para el dashboard interactivo del alumno.
    *   `DocenteController.php`: Genera estadísticas de avance educativo grupal y lista de alumnos.
    *   `ProgressController.php`: Endpoint interactivo para guardar el progreso del alumno en tiempo real.
*   **`app/Models/`**: Clases que interactúan con la base de datos a través de Eloquent ORM (`User`, `Video`, `Story`, `Progress`).
*   **`database/migrations/`**: Definición de la estructura de tablas relacionales.
*   **`routes/`**: Archivos de rutas del sistema:
    *   `routes/web.php`: Rutas del sistema central (Dashboard, Docente, Cuentos, Videos y Perfil).
    *   `routes/auth.php`: Rutas de la autenticación de usuarios.
*   **`resources/js/`**: Archivos de React. Los componentes interactivos del alumno y docente se estructuran dentro de `resources/js/Pages/` para ser mapeados por Inertia.
*   **`Documentation/`**: Contiene reportes académicos del proyecto, incluyendo el reporte académico compilable en **LuaLaTeX** (`reporte.tex`).

---

## Documentación en LaTeX
Para revisar o compilar la documentación oficial en PDF usando el compilador **LuaLaTeX**:
```bash
cd Documentation
lualatex reporte.tex
```
*(Para más detalles sobre la compilación del reporte, consulta el archivo [README.md de la carpeta de Documentación](file:///home/emmanuel/Desktop/Projects/Estancia-I/Documentation/README.md)).*
