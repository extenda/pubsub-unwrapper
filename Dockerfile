FROM node:18

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY . ./

RUN npm install --omit=dev

EXPOSE 3000

CMD npm start
