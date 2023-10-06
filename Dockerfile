FROM node:18.18.0-alpine

ENV CORS_ORIGINS='"*"'

ENV PORT=5050

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g forever
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5050

CMD [ "forever", "src/server/server.js" ]
