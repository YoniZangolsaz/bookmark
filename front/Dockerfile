FROM node:13.12-alpine
WORKDIR /
COPY package*.json ./
RUN npm config set '@teambit:registry' https://node.bit.cloud
RUN npm install --silent
COPY . .
RUN npm run build || true
CMD npm start