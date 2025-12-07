# Usamos PHP con Apache y soporte para PDO MySQL/MariaDB
FROM php:8.2-apache

# Instalamos extensión PDO para MariaDB/MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Copiamos los archivos del proyecto
COPY . /var/www/html/

# Permisos correctos
RUN chown -R www-data:www-data /var/www/html

# Exponemos el puerto 80
EXPOSE 80

# Apache ya se ejecuta en foreground por defecto

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug
