FROM node:slim AS runner

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm install  && \
    apt-get update && apt-get install -y \
    fonts-liberation libappindicator3-1 libasound2 \
    libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 \
    libcups2 libdbus-1-3 libdrm2 libexpat1 libgbm1 \
    libgconf-2-4 libglib2.0-0 libgtk-3-0 libnspr4 \
    libnss3 libnss3-dev libx11-6 libx11-xcb1 libxcomposite1 \
    libxdamage1 libxext6 libxfixes3 libxkbcommon0 libxrandr2 \
    libxss1 libxtst6 lsb-release wget xdg-utils && \
    rm -rf /var/lib/apt/lists/* && npx playwright install && npm run build

VOLUME [ "/app" ]

EXPOSE 3000

CMD ["node", "dist/main.js"]


FROM node:slim AS  development

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm install  && \
    apt-get update && apt-get install -y \
    fonts-liberation libappindicator3-1 libasound2 \
    libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 \
    libcups2 libdbus-1-3 libdrm2 libexpat1 libgbm1 \
    libgconf-2-4 libglib2.0-0 libgtk-3-0 libnspr4 \
    libnss3 libnss3-dev libx11-6 libx11-xcb1 libxcomposite1 \
    libxdamage1 libxext6 libxfixes3 libxkbcommon0 libxrandr2 \
    libxss1 libxtst6 lsb-release wget xdg-utils && \
    rm -rf /var/lib/apt/lists/* && npx playwright install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]