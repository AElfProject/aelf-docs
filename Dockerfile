FROM cgr.dev/chainguard/nginx:latest

WORKDIR /usr/share/nginx/html
COPY build .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080