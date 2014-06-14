var express = require('express');
var twilio = require('twilio');
var jf = require('jsonfile');
var traits = require('./profile.js');
var reddit = require('redwrap');

var file = './data.json';

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
  var profile = traits.getProfile(personalities[num1], archetypes[num2]);

  res.render('index.ejs', {data: profile});
});

app.post('/', function(req, res){

    var obj = {};

    jf.readFile(file, function(err, obj) {
      console.log(obj);
      phoneNum = req.body.user.phone;
      userTraits = JSON.parse(req.body.user.traits);
      obj[phoneNum] = userTraits;

      jf.writeFile(file, obj, function(err) {
        if(!err)
        {
          res.send("Thanks for submitting!");
          var messageTxt = "Alright, " + userTraits.nickname + ", don't be afraid to not be yourself! Open with: \n\n" + userTraits.firstLiner + "\n\nThen maybe start a discussion with: \n\n" + userTraits.discussion + "\n\nWe're here to help if you need anything else!";
          console.log(messageTxt);

          client.messages.create({
          to: phoneNum,
          from: "+19177465463",
          body: messageTxt,
          }, function(err, message) {
            console.log(message.sid);
          });
        }
      })
    });

});

app.get('/apitest', function(req, res){
  var topics = "";

  reddit.r('worldnews', function(err, data, res){
    for(var i = 0; i < 5; i++){
      if(!data.data.children[i].data.is_self){
        //console.log(data.data.children[i].data.title); //outputs object representing first page of WTF subreddit
        topics += data.data.children[i].data.title + "\n\n";
      }
    }
    var messageTxt = "If you don't know what to talk about, here are some topics for discussion: \n\n" + topics;

    client.messages.create({
    to: "3235135285",
    from: "+19177465463",
    body: messageTxt,
    }, function(err, message) {
      console.log(message.sid);
    });

  });



});

app.post('/sms', twilio.webhook('fc40126ed4df188851c6061be60b110c', { host:'newu.herokuapp.com', protocol:'https' }), function(req, res){
 console.log("%s: %s", req.body.From, req.body.Body);
 var messageTxt = "";
 var incomingNum = req.body.From.substr(2);
 var receivedTxt = req.body.Body.toLowerCase();

 //pull up stored numbers
 jf.readFile(file, function(err, obj) {
   user = obj[incomingNum];

    if( receivedTxt == "joke"){
     reddit.r('jokes', function(err, data, res){

      var post = Math.floor(Math.random() * 5);
      var joke = data.data.children[post].data.title + "\n" + data.data.children[post].data.selftext;

      messageTxt = "This one will knock 'em dead: \n\n" + joke;
      console.log(messageTxt);

      client.messages.create({
        to: req.body.From,
        from: "+19177465463",
        body: messageTxt,
        }, function(err, message) {
          if(!err){
            console.log(message.sid);
          }
          else{
            console.log(err);
          }
      });

     });

    }

    else if( receivedTxt == "help"){
      var responseNum = Math.floor(Math.random() * 4);
      if(responseNum == 0){
        reddit.r('worldnews', function(err, data, res){
          for(var i = 0; i < 5; i++){
            if(!data.data.children[i].data.is_self){
              //console.log(data.data.children[i].data.title); //outputs object representing first page of WTF subreddit
              topics += data.data.children[i].data.title + "\n\n";
            }
          }
          var messageTxt = "If you don't know what to talk about, here are some topics for discussion: \n\n" + topics;

          client.messages.create({
          to: req.body.From,
          from: "+19177465463",
          body: messageTxt,
          }, function(err, message) {
            if(!err){
              console.log(message.sid);
            }
            else{
              console.log(err);
            }
          });

        });
      }
      else if(responseNum == 1){

        var messageTxt = "You're fucked.";

        client.messages.create({
        to: req.body.From,
        from: "+19177465463",
        body: messageTxt,
        }, function(err, message) {
          if(!err){
            console.log(message.sid);
          }
          else{
            console.log(err);
          }
        });

      }
      else if(responseNum == 2){

        var messageTxt = "Try again later.";

        client.messages.create({
        to: req.body.From,
        from: "+19177465463",
        body: messageTxt,
        }, function(err, message) {
          if(!err){
            console.log(message.sid);
          }
          else{
            console.log(err);
          }
        });
      }
      else if(responseNum == 3){

        var messageTxt = "Who is this?";

        client.messages.create({
        to: req.body.From,
        from: "+19177465463",
        body: messageTxt,
        }, function(err, message) {
          if(!err){
            console.log(message.sid);
          }
          else{
            console.log(err);
          }
        });

      };
    }

    else
    {
      if(user){

        if(receivedTxt == "who am i?" || receivedTxt == "who am i"){
          messageTxt = "Remember, " + user.nickname + ", don't be afraid to not be yourself! You are a "+ user.personality + " " + user.archetype + "!\n\nOpen with: \n\n" + user.firstLiner + "\n\nThen maybe start a discussion with: \n\n" + user.discussion + "\n\nWe're here to help if you need anything else!\n\nIf you need help reply with any of these key phrases: who am i?, body language, opening line, about, movies, politics, hobbies, anecdote, hobbies, anecdote, accessories, discussion"
        }
        else if(receivedTxt == "body language" || receivedTxt == "bodylanguage" || receivedTxt == "body"){
         messageTxt = "You are your body...\n\n" + user.bodyLang;
        }
        else if(receivedTxt == "open" || receivedTxt == "opening line" || receivedTxt == "opener"){
         messageTxt = "Hit 'em with this...\n\n" + user.firstLiner;
        }
        else if(receivedTxt == "about" || receivedTxt == "about me"){
         messageTxt = "This will get their attention...\n\n" + user.music;
        }
        else if(receivedTxt == "movie" || receivedTxt == "movies"){
         messageTxt = "Hit 'em with this...\n\n" + user.movies.list + "\n\n" + user.movies.action;
        }
        else if(receivedTxt == "politics"){
         messageTxt = "Talking about politics? Say this...\n\n" + user.politics;
        }
        else if(receivedTxt == "hobbies"){
         messageTxt = "Here's what you do for 'fun'...\n\n" + user.hobbies;
        }
        else if(receivedTxt == "anecdote"){
         messageTxt = "Story time, baby...\n\n" + user.anecdote;
        }
        else if(receivedTxt == "accessories"){
         messageTxt = "Dress for success...\n\n" + user.clothes;
        }
        else if(receivedTxt == "discussion" ){
         messageTxt = "Forgot what to say? Let me refresh your memory...\n\n" + user.discussion;
        }
        else{
          	messageTxt = "Remember: Don't be afraid to not be yourself!\n\nIf you need help reply with any of these key phrases: who am i?, body language, opening line, about, movies, politics, hobbies, anecdote, hobbies, anecdote, accessories, discussion.";
        }
      }
      else{
        messageTxt = "Who are you?";
      }

      client.messages.create({
        to: req.body.From,
        from: "+19177465463",
        body: messageTxt,
        }, function(err, message) {
          if(!err){
            console.log(message.sid);
          }
          else{
            console.log(err);
          }
      });
    };
  });

});

app.use(function(req, res, next){
  res.send(404, '<h1>This is probably not the page you are looking for. </br><a href="/">Take me back</a></h1>');
})

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
