
var express = require('express');
var tweetController = require('./Controller/Tweet');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/View'));
app.use('/static', express.static(__dirname + '/View'));
app.route('/tweet').post( function (req, res) {


  var part = req.body.part;
  var sort = req.body.sort;
  var newData =  tweetController.getTweets(part,sort);


  var obj = {items: newData};

  res.json(obj);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

