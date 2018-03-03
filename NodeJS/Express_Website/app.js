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
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req, res){
     res.render('index',{title: 'Welcome!'}); 
    });

app.get('/about',function(req, res){
        res.render('about',{about_title: 'About our company.'}); 
    });
    
app.get('/contacts',function(req, res){
        res.render('contacts'); 
    });

app.post('/contacts/send', function(req, res){

       var transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {
            user: req.body.username,
            pass: req.body.password //this is to pass password and email from form to test
        }

       });

       var mailOptions = {

        from: 'Bureau7',
        to: 'developers@bureau7.com',
        subject: 'Website Submission',
        text: 'You have a submission with the following details: Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
        html: '<p>You have a submission with the following details: </p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'

       };

       transporter.sendMail(mailOptions, function(error, info){

        if(error){

            console.log('Error sending data:'+error);
            res.redirect('/');
        } else {
            console.log('Message Sent: '+info.response);
            res.redirect('/');

        }


       });
    });
    
app.listen(port);
console.log("Server listening on port %d", port);