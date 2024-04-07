FROM node:20.0.0

LABEL org.opencontainers.image.source=https://github.com/rosewang01/dockerize-boilerplate
LABEL org.opencontainers.image.description="Boilerplate Server Side Container"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /

COPY ./package.json ./package.json
RUN yarn install 
RUN yarn add --dev typescript@latest

COPY . .

EXPOSE 4000
CMD ["yarn", "server"]