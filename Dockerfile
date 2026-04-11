FROM node:22-slim

RUN apt-get update && apt-get install -y \
  libreoffice \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "backend/server.js"]

FROM node:22-slim

RUN apt-get update && apt-get install -y \
  libreoffice \
  fonts-liberation \
  fonts-dejavu \
  ttf-mscorefonts-installer \
  fontconfig \
  --no-install-recommends \
  && fc-cache -f -v \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "backend/server.js"]