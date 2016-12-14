FROM node:argon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g angular-cli;
COPY . /

EXPOSE 80

CMD["ng", "server", "--host", "0.0.0.0", "--port", "80"]