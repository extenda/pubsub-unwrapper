FROM node:22-slim

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src/ ./src/

USER node

EXPOSE 3000

ENTRYPOINT ["node", "src/server.js"]
