var express = require('express');
var twilio = require('twilio');
var traits = require('./profile.js');

var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(__dirname));
//app.engine('html', require('ejs').renderFile);

// Twilio Credentials
var accountSid = 'ACea21e8d578fa4d36a035d5e9fe2f440a';
var authToken = 'fc40126ed4df188851c6061be60b110c';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

var server = require('http').Server(app);

var personalities = [ 'confident',
                      'shy',
                      'sassy',
                      'mysterious',
                      'sensitive',
                      'artistic',
                      'neutral',
                      'optimistic',
                      'sarcastic',
                      'paranoid',
                      'german',
                      'dead'
                    ];

var archetypes = [    'hacker',
                      'comedian',
                      'athlete',
                      'musician',
                      'student',
                      'socialite',
                      'bro',
                      'vegan',
                      'brooklynite',
                      'workaholic',
                      'wizard',
                      'dog'
                  ];


app.get('/', function(req, res) {
  //res.render('index.ejs');
  var num1 = Math.floor(Math.random() * 12);
  var num2 = Math.floor(Math.random() * 12);
  console.log("RANDOS");
  console.log(num1);
  console.log(num2);
  var profile = traits.getProfile(personalities[num1], archetypes[num2]);

  client.messages.create({
	to: "3235135285",
	from: "+19177465463",
	body: "hellooooo this is the newU",
  }, function(err, message) {
  	console.log(message.sid);
  });

  res.render('index.ejs', {data: profile});
});

app.post('/sms', twilio.webhook('fc40126ed4df188851c6061be60b110c', { host:'newu.herokuapp.com', protocol:'https' }), function(req, res){
 console.log("%s: %s", req.body.From, req.body.Body);

 client.messages.create({
  	to: "3235135285",
  	from: "+19177465463",
  	body: "hellooooo this is the newU",
  }, function(err, message) {
  	console.log(message.sid);
  });
});

app.use(function(req, res, next){
  res.send(404, '<h1>This is probably not the page you are looking for. </br><a href="/">Take me back</a></h1>');
})

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
