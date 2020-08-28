FROM node:10

WORKDIR /contact-form

ENV PORT 8081

COPY package.json /email/contact-form.json .

RUN npm install

COPY . /contact-form

CMD ["node", "contact-form/app.js"]