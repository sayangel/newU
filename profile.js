var bodylang = require('./bodylanguage.json');
var music = require('./music.json');
var movies = require('./movies.json');
var politics = require('./politics.json');
var anecdote = require('./anecdote.json');
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
  profile.firstLiner = getFirstLiner();
  profile.music = getMusic(personality, archetype);
  profile.movies = getMovies(personality, archetype);
  profile.politics = getPolitics(personality, archetype);
  profile.hobbies = getHobbies();
  profile.anecdote = getAnecdote(personality, archetype);
  profile.clothes = getClothes(archetype);
  profile.catchphrase = getCatchphrase();
  profile.discussion = getDiscussion(archetype);
  profile.nickname = getNickname();
  return profile;
};


function getBodyLang(personality)
{
  return bodylang[personality];
};

function getFirstLiner(){

  var firstLiners = [
                      "What a night, huh?",
                      "who invited this guy?",
                      "Now that’s a pretty smile!",
                      "Somebody please talk to me, I’m lonely.",
                      "Anybody want a high-five?",
                      "Who knows magic? I’m so down to see a magic trick.",
                      "I want you to play me like one of your French horns.",
                      "Imagine a dolphin with a really deep voice named Fin Diesel.",
                      "Jesus, take the wheel!",
                      "Who is your favorite starter Pokemon and why is it Charmander?",
                      "Imagine a horse race but all the horses are named Steve.",
                      "I can dunk a basketball.",
                      "How many pushups do you think I can do?"
                    ];

  return firstLiners[Math.floor(Math.random() * 13)];

};

function getMusic(personality, archetype){
  var musicTrait = music.archetype[archetype] + " " + music.personality[personality];
  return musicTrait;
};

function getMovies(personality, archetype){
  var movieTrait = movies.archetype[archetype] + " " + movies.personality[personality];
  return movieTrait;
};

function getPolitics(personality, archetype){
  var topic = politics.archetype[archetype];
  var action = politics.personality[personality];
  var sentence = "The only political issue I’m caught up on right now is " + topic + "." + action;
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
  return hobbies[Math.floor(Math.random() * 10)];
};

function getAnecdote(personality, archetype){
  var anecdoteText = anecdote.archetype[archetype] + " " + anecdote.personality[personality];
  return anecdoteText;
};

function getClothes(archetype){
  return clothes[archetype];
};

function getCatchphrase(){
  var catchphrases =     [
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
  return catchphrases[Math.floor(Math.random() * 10)];
};

function getDiscussion(archetype){
  return discussion[archetype];
};

function getNickname(){
  var nicknames =     [
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
  return nicknames[Math.floor(Math.random() * 10)];
};

exports.getProfile = getProfile;
