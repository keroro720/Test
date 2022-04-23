FROM node:fermium
WORKDIR /app
COPY . .
RUN yarn
CMD node dist/src/index.ts