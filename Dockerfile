FROM node:lts
WORKDIR /app
COPY . /app
RUN yarn install && yarn link
ENTRYPOINT ["fga-transformer-cli"]