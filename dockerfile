FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

# just for review, need to config in vite config
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]