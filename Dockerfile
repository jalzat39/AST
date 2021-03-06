FROM node:11

LABEL version="1.0"
LABEL description="Project 1"
LABEL maintainer="Jose Miguel Alzate A - jalzat39@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /Tracking

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD npm start