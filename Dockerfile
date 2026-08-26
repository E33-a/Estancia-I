FROM php:8.2-apache

# 1. Instalar dependencias del sistema, extensiones PHP y Node.js para Vite
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    sqlite3 \
    libsqlite3-dev \
    nodejs \
    npm \
    && docker-php-ext-install pdo pdo_sqlite pdo_mysql gd

# 2. Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 3. Copiar código fuente al contenedor
COPY . /var/www/html
WORKDIR /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER=1

# 4. Limpiar cachés locales y realizar instalación limpia de dependencias PHP
RUN rm -f bootstrap/cache/*.php
RUN composer install --optimize-autoloader --no-interaction

# 5. Compilar los activos de React/Vite para producción
RUN npm install && npm run build

# 6. Crear estructura de almacenamiento de Laravel y SQLite si no existen
RUN mkdir -p storage/framework/cache/data \
             storage/framework/sessions \
             storage/framework/views \
             storage/logs \
             bootstrap/cache \
             database

RUN touch database/database.sqlite

# 7. Asignar permisos necesarios a Apache (www-data)
RUN chown -R www-data:www-data storage bootstrap/cache database
RUN chmod -R 775 storage bootstrap/cache database

# 8. Configurar servidor Apache DocumentRoot hacia /public y habilitar .htaccess
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/conf-available/*.conf
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf
RUN echo '<Directory /var/www/html/public>\n    Options Indexes FollowSymLinks\n    AllowOverride All\n    Require all granted\n</Directory>' >> /etc/apache2/apache2.conf



EXPOSE 80

# 9. Ejecutar migraciones, seeds e iniciar servidor Apache
CMD php artisan migrate --force && php artisan db:seed --force && apache2-foreground
