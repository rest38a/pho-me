FROM node:14

WORKDIR /app/

COPY . ./

WORKDIR ./client-v2/

RUN npm install && npx quasar build -m ssr

CMD [ "node", "./dist/ssr/index.js" ]
