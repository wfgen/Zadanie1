# Budowanie aplikacji
FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Uruchomienie aplikacji
FROM node:14-alpine

WORKDIR /app

COPY --from=build /app .

LABEL author="Vladyslav Zaporozhskyi"

EXPOSE 8000

# Uruchomienie serwera
CMD [ "node", "myapp.js" ]
