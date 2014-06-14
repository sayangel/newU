var express = require('express');
var traits = require('./traits.js');

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
                      'dead'];

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
                      'dog'];

var profile = {
  personality:"",
  archetype:"",
  bodyLang:"",
  firstLiner:"",
  music:"",
  movie:"",
  politic:"",
  hobbies:"",
  anecdote:"",
  clothes:"",
  catchphrase:"",
  discussion:"",
  nickname:""
};

app.get('/', function(req, res) {
  //res.render('index.ejs');
  res.send('Bob is writing content...')
});

app.use(function(req, res, next){
  res.send(404, '<h1>This is probably not the page you are looking for. </br><a href="/">Take me back</a></h1>');
})

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
