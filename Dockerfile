FROM node:10.15-alpine
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY server.js /usr/src/app/
COPY dist /usr/src/app/dist/
RUN npm install --save express
EXPOSE 4200
CMD node server.js
