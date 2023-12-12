# Spécifier les versions des images docker utilisées
ARG PHP_VERSION=7.4
ARG NGINX_VERSION=alpine

FROM madnight/docker-alpine-wkhtmltopdf as wkhtmltopdf

### BUILD UPSTREAM (une seule fois)
FROM php:${PHP_VERSION}-fpm-alpine3.13 as php_dev_upstream
# Basic tools
RUN apk --no-cache add autoconf build-base curl git icu-dev libpng-dev jpeg-dev libzip-dev oniguruma-dev zlib-dev dbus fontconfig glib gtk+ openssl ttf-freefont 
# PHP
# RUN pecl install apcu
RUN docker-php-ext-install calendar gd mbstring intl pdo_mysql opcache exif zip

# Composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

### BUILD APP
FROM php_dev_upstream as fingz_php_dev

# Installer les déps php (via composer)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PATH="${PATH}:/root/.composer/vendor/bin"

WORKDIR /srv/symfony

# Eviter de réinstaller les deps à chaque fois
COPY app/symfony/composer.* app/symfony/symfony.lock ./

# wkhtmltopdf
COPY --from=wkhtmltopdf /bin/wkhtmltopdf /usr/bin

# Copier uniquement les sources dont on a besoin
ADD app/symfony/.env ./.env
COPY app/symfony/bin bin/
ADD app/symfony/config config/
ADD app/symfony/src src/
ADD app/symfony/templates templates/
ADD app/symfony/public public/

RUN set -eux; \
	php -d memory_limit=-1 /usr/bin/composer install --prefer-dist --no-plugins --no-scripts --no-progress; \
	composer clear-cache

RUN set -eux; \
	mkdir -p var/cache var/log; \
	chmod -R 777 var/cache var/log; \
	chmod +x bin/console; sync

VOLUME /srv/symfony/var

COPY docker/symfony/etc/php/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint
# Executer le workflow d'installation (modification du schéma de la base et insertion des données de test)

# Copy cronjobs file to the path
COPY docker/symfony/etc/php/cronjobs /etc/cron.d/cronjobs
# Apply permissions
RUN chmod 0644 /etc/cron.d/cronjobs
# Run crontab
RUN /usr/bin/crontab /etc/cron.d/cronjobs

ENTRYPOINT ["docker-entrypoint"]

# Executer fpm au démarrage du container php 
CMD ["php-fpm"]


