# base image
FROM node:current-alpine

# set working directory
WORKDIR /app

# Modules pour React
VOLUME /app/node_modules

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY source/package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm update

# copy everything else and run app
COPY source/public/. ./app/public/
COPY source/src/. ./app/src/

# start app
CMD ["npm", "start"]
