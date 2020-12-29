// const express = require('request')
const bodyParser = require('cheerio');
const request = require('request');

request('http://codedemos.com/sampleblog', (error, response, html) =>{
  if(!error && response.statusCode == 200){
    console.log(html)
    // const $ = cheerio.load(html);

    const siteHeading = $('.site-heading');

    // console.log(siteHeading.html())
    // console.log(siteHeading.text)

    // const output = siteHeading
    // .children('h1')
    // .parent()
    // .text();

    $('.nav-item a').each((i, el) => {
      const item = $(el).text()
      console.log(item)
    })
  }
})
