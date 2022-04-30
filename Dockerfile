FROM node:16-alpine

WORKDIR /app/redis-crud

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]