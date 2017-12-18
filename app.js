const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const port = 3000;
const url = 'https://aw.krimsekt.ua/apps/test1/email/index.htm';

request(url, (err, resp, body) => {
    const $ = cheerio.load(body);
    const rdFile = fs.readFile('users.json', (err, data) => {
      if (err) {
            fs.writeFileSync("users.json","[]");
            return;
      }
      let arr = JSON.parse(data.toString()) || [];
      console.log(arr);

      $('tr').each(function(i, elem) {
          const childrenLast = $(this).children().last();
            const name = childrenLast.prev().text().split(' ');
             arr.push({
                  "lastname":name[0],
                  "firstname":name[1],
                  "email":childrenLast.text(),
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

      fs.writeFile('users.json', JSON.stringify(arr), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
    });
   
});