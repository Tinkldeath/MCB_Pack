FROM node 

WORKDIR /api 

COPY . .

COPY package.json /api/

RUN npm install

EXPOSE 4000

CMD [ "node", "index.js" ]