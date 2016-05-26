var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();
 
app.get('/', function (req, res, next) {
  superagent.get('www.baidu.com')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      };
      var $ = cheerio.load(sres.text);
      console.log(sres.text);
      var items = [];
      $('#linkcat-2 li').each(function (k, v) {
        var c = $(this).children();
        items.push({
          title: c.text(),//c.html(),
          href: c.attr('href')   
        });
      });
      res.send(items);
    });
});
 
app.listen(3000,function(){
  console.log('app is listening at port 3000');
});