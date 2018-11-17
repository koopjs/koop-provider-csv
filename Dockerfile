FROM node:10
RUN mkdir -p /srv/www/koop
ADD package.json /srv/www/koop
ADD .env /srv/www/koop
WORKDIR /srv/www/koop
RUN npm install
ADD src /srv/www/koop
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/node", "/srv/www/koop/server.js"]
