FROM node:18.13

WORKDIR /usr/src/app

ADD ./ ./

RUN npm install -q --only=prod

ENV CONFIG_FILE /config/config.json

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]

COPY . ./
