FROM node:argon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /

EXPOSE 80

CMD["ng", "server", "--host", "0.0.0.0", "--port", "80"]