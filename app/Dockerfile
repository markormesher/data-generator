FROM node:carbon

WORKDIR /usr/src/app

# dependencies
COPY package.json .npmrc ./
RUN npm i

# source code
COPY . .

# run
EXPOSE 3000
CMD ["node", "./app.js"]
