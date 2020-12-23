FROM node:14

WORKDIR /app/

COPY . ./

WORKDIR ./client-v2/

EXPOSE 8080

RUN npm install

RUN npm install -g @quasar/cli

CMD quasar dev -m ssr
