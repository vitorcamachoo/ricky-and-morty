FROM nginx:1.19-alpine as server

# install inotify
RUN apk add inotify-tools
COPY ./nginx/auto-reload.sh .
RUN chmod +x auto-reload.sh

# Stage 1: Builds and compiles the frontend
FROM node:14-alpine AS build

WORKDIR /app
COPY package.json yarn.* ./

RUN yarn --pure-lockfile

COPY . .

RUN yarn build
RUN yarn export

FROM server as app
COPY --from=build /app/out /var/www/out

CMD ["/auto-reload.sh"]