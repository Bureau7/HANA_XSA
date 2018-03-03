/*eslint no-console: 0*/
var port = process.env.PORT || 3000;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function(req, res){
     res.render('index');   
});

app.listen(port);
console.log("Server listening on port %d", port);