FROM node:16.6.2-alpine3.11

COPY . /meh

WORKDIR /meh

RUN npm i
RUN npm dedupe
RUN npm run build
RUN npm run migrate

CMD ["npm", "start"]
