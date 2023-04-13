FROM node:lts-alpine as base

# Initial

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Checks

FROM base as tests

RUN npm run type-check && npm run test:unit

# Build

FROM base as build

ENV NODE_ENV='production'

RUN npm set progress=false && npm run build-only

# Run

EXPOSE 8080
CMD [ "http-server", "dist" ]