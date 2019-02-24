FROM node:dubnium-alpine
LABEL author="Aaron Osher <aaron@aaronosher.io>"

RUN npm install yarn -g

ADD package.json /tmp/package.json
RUN cd /tmp && yarn
RUN mkdir -p /usr/app/src && cp -a /tmp/node_modules /usr/app/src

WORKDIR /usr/app/src
ADD . /usr/app/src

RUN yarn build

RUN mkdir -p /usr/app/database/
RUN touch /usr/app/database/committeeBot.db
ENV DB_LOCATION /usr/app/database

CMD ["yarn", "serve"]
