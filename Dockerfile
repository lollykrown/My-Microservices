FROM node:14.6.0

WORKDIR /email

ENV PORT 80

COPY package.json /email/package.json .

RUN npm install

COPY . /email

CMD ["node", "email/app.js"]