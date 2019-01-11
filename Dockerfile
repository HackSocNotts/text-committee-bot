FROM node:dubnium-alpine

WORKDIR /usr/app/src

RUN npm install yarn -g

COPY . .

RUN yarn install

RUN yarn build

RUN mkdir -p /usr/app/database/

RUN touch /usr/app/database/committeeBot.db

ENV DB_LOCATION /usr/app/database

CMD ["yarn", "serve"]
