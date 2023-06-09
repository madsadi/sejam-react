# Dockerfile

# base image
FROM registry.tech1a.co:81/repository/tech1a-docker-registry/node:alpine
#FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN yarn install

# start app
RUN yarn run build
EXPOSE 3000

#RUN rm -rf /usr/src/node_modules
RUN yarn cache clean



CMD yarn run start
