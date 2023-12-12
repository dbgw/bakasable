start:
		docker compose up -d --build --remove-orphans
build:
		docker compose stop && docker compose build --no-cache
restart:
		docker compose down -v && docker compose up -d --build --remove-orphans
light_restart:
		docker compose restart
stop:
		docker compose stop
build_php:
		docker compose up -d --no-deps --build  php
