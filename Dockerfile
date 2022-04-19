FROM node:fermium
WORKDIR /app
COPY . .
RUN yarn