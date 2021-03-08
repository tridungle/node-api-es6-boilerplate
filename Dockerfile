FROM node:alpine

RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    && npm install -g node-pre-gyp
# && apk del .gyp

ADD package.json package-lock.json /app/
WORKDIR /app
RUN npm install --build-from-source

ADD . /app

ENV NODE_ENV development
ENV PORT 3000
ENV MONGODB_URI mongodb://localhost:27017/ss_surveydb
ENV HEALTH_ENDPOINT /healthcheck
ENV LOG_LEVEL silly
ENV MASTER_ADMIN_SECRET RImYMnM8ISyd65YeIJVg
ENV MAX_REQUEST_BODY_SIZE 5mb

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start-service"]