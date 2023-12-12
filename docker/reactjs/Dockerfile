ARG NODE_VERSION=14

FROM node:${NODE_VERSION}-alpine AS fingz_client_deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY app/reactjs/package*.json ./
RUN yarn

FROM node:${NODE_VERSION}-alpine AS fingz_client_builder
WORKDIR /app
COPY app/reactjs .
COPY app/reactjs/.env .env
COPY --from=fingz_client_deps /app/node_modules ./node_modules
RUN yarn build

FROM nginx:alpine AS fingz_client_nginx

RUN rm /etc/nginx/conf.d/*

COPY docker/reactjs/etc/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=fingz_client_builder /app/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
