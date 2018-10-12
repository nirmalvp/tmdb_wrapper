FROM node
RUN npm install -g yarn
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json .
RUN yarn install
COPY . .
CMD ["yarn", "start"]
