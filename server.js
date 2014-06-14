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

var profile = traits.getProfile(personalities[0], archetypes[0]);

app.get('/', function(req, res) {
  //res.render('index.ejs');
  res.send('Bob is writing content...');
});

app.use(function(req, res, next){
  res.send(404, '<h1>This is probably not the page you are looking for. </br><a href="/">Take me back</a></h1>');
})

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
