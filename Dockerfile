FROM node:18

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY . ./
RUN npm install --only=production

CMD npm start
