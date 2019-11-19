FROM node:8-alpine AS builder

WORKDIR /lyre/client
ADD client .
RUN npm install
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/local/lyre/client
COPY --from=builder /lyre/client/build .
COPY config.nginx /etc/nginx/nginx.conf


