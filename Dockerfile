FROM node:dubnium-alpine

WORKDIR /usr/app/src

RUN npm install yarn -g

COPY . /usr/src/app

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]
