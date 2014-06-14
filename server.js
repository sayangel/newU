var express = require('express');
var traits = require('./profile.js');

var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(__dirname));
//app.engine('html', require('ejs').renderFile);

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
  res.render('index.ejs', {data: profile});
});

app.use(function(req, res, next){
  res.send(404, '<h1>This is probably not the page you are looking for. </br><a href="/">Take me back</a></h1>');
})

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
