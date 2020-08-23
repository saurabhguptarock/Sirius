FROM node:12

WORKDIR /usr/src/app

ENV PORT 3000

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD yarn start
