FROM node:14 as base

WORKDIR /app


COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

FROM base


COPY knexfile.docker.ts knexfile.ts