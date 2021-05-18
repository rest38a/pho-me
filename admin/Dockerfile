FROM node:14

WORKDIR ./app/

COPY . ./

RUN npm install && npx browserslist@latest --update-db

CMD npx quasar dev
