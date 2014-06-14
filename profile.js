var bodylang = require('./bodylanguage.json');
var music = require('./music.json');
var movies = require('./movies.json');
var politics = require('./politics.json');
var clothes = require('./clothes.json')
var discussion = require('./discussion.json')

function getProfile(personality, archetype){

  var profile = {
    personality:"",
    archetype:"",
    bodyLang:"",
    firstLiner:"",
    music:"",
    movies:"",
    politics:"",
    hobbies:"",
    anecdote:"",
    clothes:"",
    catchphrase:"",
    discussion:"",
    nickname:""
  };


  profile.personality = personality;
  profile.archetype = archetype;
  profile.bodyLang = getBodyLang(personality);
  console.log(getFirstLiner());
  return profile;
};


function getBodyLang(personality)
{
  return bodylang[personality];
};

function getFirstLiner(){
  var firstLiners = [
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                    ];

  return firstLiners[Math.floor(Math.random() * 10)];

};

function getMusic(personality, archetype){
  var musicTrait = music.archetype[archetype] + " " + music.personality[personality];
  return musicTrait;
};

function getMovies(personality, archetype){
  var moviesTrait = movies.archetype[archetype] + " " + movies.personality[personality];
  return movieTrait;
};

function getPolitics(personality, archetype){
  var topic = politics.archetype[archetype];
  var action = politics.personality[personality];
  var sentence = "The only political issue I’m caught up on right now is " + topic "." + action;
  return sentence;
};

function getHobbies(){
  var hobbies =     [
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                      "who invited this guy?",
                    ];
  return movies[Math.floor(Math.random() * 10)];
};

function getAnecdote(personality, archetype){};

function getClothes(archetype){
  return clothes[archetype];
};

function getCatchphrase(){};

function getDiscussion(archetype){
  return discussion[archetype];
};

function getNickname(){};



exports.getProfile = getProfile;
