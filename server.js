var express = require('express');
var twilio = require('twilio');
var traits = require('./profile.js');
var reddit = require('redwrap');

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
    console.log(messageTxt);

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

 if(req.body.Body === "joke")
 {
   reddit.r('jokes', function(err, data, res){

    var post = Math.floor(Math.random() * 5);
     var joke = data.data.children[post].data.title + "\n" + data.data.children[post].data.selftext;

     var messageTxt = "This one will knock 'em dead: \n\n" + joke;
     console.log(messageTxt);

     client.messages.create({
     to: "3235135285",
     from: "+19177465463",
     body: messageTxt,
     }, function(err, message) {
       console.log(message.sid);
     });

   });

 }
 else{
   client.messages.create({
    	to: "3235135285",
    	from: "+19177465463",
    	body: "thx",
    }, function(err, message) {
    	console.log(message.sid);
    });
  }
});

app.use(function(req, res, next){
  res.send(404, '<h1>This is probably not the page you are looking for. </br><a href="/">Take me back</a></h1>');
})

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
