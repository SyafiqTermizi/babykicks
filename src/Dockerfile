FROM node:22.17-alpine3.21 AS static-build-stage

WORKDIR  /app/

COPY . ./

RUN npm i && npm run build

# production environment
FROM nginx:1.29.0-alpine AS static-run-stage

COPY --from=static-build-stage /app/dist /usr/share/nginx/html
COPY --from=static-build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]