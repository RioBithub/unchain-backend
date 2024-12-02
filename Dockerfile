# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE ${PORT:-8080}

CMD ["npm", "start"]
