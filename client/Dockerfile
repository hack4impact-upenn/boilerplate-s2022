FROM node:19.6.0
LABEL org.opencontainers.image.source=https://github.com/rosewang01/dockerize-boilerplate
LABEL org.opencontainers.image.description="Boilerplate Client Side Container"
LABEL org.opencontainers.image.licenses=MIT
WORKDIR /
COPY ./package.json /package.json
COPY ./public /public
COPY ./src /src
RUN yarn config set network-timeout 600000 -g
RUN yarn install
EXPOSE 3000
CMD ["yarn","client"]