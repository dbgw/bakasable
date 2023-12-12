#!/bin/sh
set -e

# first arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
	set -- php-fpm "$@"
fi

if [ "$1" = 'php-fpm' ] || [ "$1" = 'bin/console' ]; then
	bin/console lexik:jwt:generate-keypair --overwrite || true
	#bin/console d:d:d --force || true
	bin/console d:d:c --if-not-exists || true
	bin/console d:s:u -f || true
	bin/console assets:install
	bin/console cache:clear
fi

exec docker-php-entrypoint "$@"

# start cron
/usr/sbin/crond -f -l 8