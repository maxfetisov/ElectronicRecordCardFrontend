FROM node:20.12.2 as build
WORKDIR /app
COPY package*.json /app
RUN npm install --force
COPY . /app
RUN npm run build

FROM nginx:1.17.1-alpine
WORKDIR .
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/electronic-record-card-frontend /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]

