FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN npm install

COPY src ./src
COPY docs ./docs

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then npm run dev; else node src/main.js; fi"]