var express = require('express');
var path = require('path');
var app = express();
var watsonTwitter = require('./watsonTwitter.js');

app.use(express.static(path.resolve(__dirname, 'watson')));

app.get('/getmood', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  watsonTwitter(res);
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  console.log('Cascadia Watson is running! Find out the mood!');
});