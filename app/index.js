'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/calc', function(req, res){
  res.render('calc');
});

app.post('/calc', function(req, res){
  var x = req.body.x * 1;
  var y = req.body.y * 1;
  var result = 0;
  var oper = req.body.oper;

  switch(oper){
    case '+':
      result = x + y;
      break;
    case '-':
      result = x - y;
      break;
    case '*':
      result = x * y;
      break;
    case '/':
      result = x / y;
  }

  res.render('calc', {x:x, y:y, oper:oper, result:result});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT',port);
});
