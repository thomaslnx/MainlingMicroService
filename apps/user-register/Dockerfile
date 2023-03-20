FROM node:16-alpine AS development

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . /src/