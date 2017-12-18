const cheerio = require('cheerio');
const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const port = 3000;
const fetch = require('node-fetch');
const url = 'https://aw.krimsekt.ua/apps/test1/email/index.htm';

request(url, (err, resp, body) => {
    const $ = cheerio.load(body);
    let arr = [];
    $('tr').each(function(i, elem) {
      //     if ($(this).children().first().attr('colspan') == 2) {

             arr.push({
                    "lastname":$(this).children().last().prev().text().split(' ')[0],
                    "firstname":$(this).children().last().prev().text().split(' ')[1],
                    "email":$(this).children().last().text()
              })
      //     }
    });//find('td').text()//each(function(i, elem) { return $(this).length})//has('[colspan=2]').siblings().each( function(i,td) {return $(this).text()});
      console.log(arr);
});


// app.listen(port);
// console.log('Server running on ' + port);

/* 
fetch(url)
.then(res => res.text())
.then(body => {
      const $ = cheerio.load(body);

console.log($('tbody').find('td'));
// $('h2').addClass('welcome')

// $.html()
// console.log(body);

});
 */