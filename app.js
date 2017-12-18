const cheerio = require('cheerio');
const request = require('request');
const port = 3000;
const url = 'https://aw.krimsekt.ua/apps/test1/email/index.htm';

request(url, (err, resp, body) => {
    const $ = cheerio.load(body);
    let arr = [];
    $('tr').each(function(i, elem) {
            const name = $(this).children().last().prev().text().split(' ');
             arr.push({
                  "lastname":name[0],
                  "firstname":name[1],
                  "email":$(this).children().last().text(),
                  "name": `${name[0]} ${name[1]}`,
                  "internalPhone": "",
                  "position": "",
                  "unit": "",
                  "department": "",
                  "gender": "",
                  "img": "",
                  "birthday": ""
              });
    });
      console.log(arr);
});