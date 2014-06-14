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
    movies:{},
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
  var movieTraits = {list:movies.archetype[archetype],action:movies.personality[personality]};
  return movieTraits;
};

function getPolitics(personality, archetype){
  var topic = politics.archetype[archetype];
  var action = politics.personality[personality];
  var sentence = "The only political issue I’m caught up on right now is " + topic +" "+ action;
  return sentence;
};

function getHobbies(){
  var hobbies =    [
                      "Rock Climbing",
                      "Murder Mystery Novels",
                      "Ping Pong",
                      "Watching Videos of Animals Doing Human Stuff",
                      "Cambodian Soap Operas",
                      "Skee-Ball",
                      "Barbecuing Pork Ribs and Pork Chops",
                      "Offseason Trick-Or-Treating",
                      "Writing Poetry about Birds",
                      "Barbecuing Pork Ribs and Pork Chops",
                      "Offseason Trick-Or-Treating",
                      "Writing Poetry about Birds",
                      "Yodeling",
                      "BMX",
                      "Growing Bonsai Trees",
                      "Calligraphy",
                      "Summoning Ghosts",
                      "Hot Air Ballooning"
                    ];

  var hobbiesList = hobbies[Math.floor(Math.random() * 3)] + ", " + hobbies[Math.floor(Math.random() * 3)+3] + ", " + hobbies[Math.floor(Math.random() * 3)+6] + ", " + hobbies[Math.floor(Math.random() * 3)+9] + ", and " + hobbies[Math.floor(Math.random() * 3)+12];
  return hobbiesList;
};

function getAnecdote(personality, archetype){
  var anecdoteText = anecdote.archetype[archetype] + " " + anecdote.personality[personality];
  return anecdoteText;
};

function getClothes(archetype){
  return clothes[archetype];
};











function getCatchphrase(){
  var catchphrases =
                    [
                      "I am all about that!",
                      "Get a load of this!",
                      "I dunno, who’s asking?",
                      "We’re gonna live forever!",
                      "Hey I’m just here to have a good time.",
                      "Pay attention, I’m droppin’ knowledge!",
                      "Who’s ready for a mindgasm?",
                      "You guys are my best friends.",
                      "This one goes out to yo momma.",
                      "Mr. Gorbachev. Turn. Down. For. What.",
                    ];
  return catchphrases[Math.floor(Math.random() * 10)];
};

function getDiscussion(archetype){
  return discussion[archetype];
};

function getNickname(){
  var nicknames =
                  [
                      "The Claw",
                      "Glowstick",
                      "Tripwire",
                      "Ass Cooker",
                      "Milkshake",
                      "Fruit Loops",
                      "Crispy",
                      "Morgan Freeman",
                      "Snoop Froggy Frog",
                      "Big Dipper",
                      "Moustache Magoo",
                      "Skim Milk",
                      "Twizzler",
                      "The Baconator"
                    ];
  return nicknames[Math.floor(Math.random() * 14)];
};

exports.getProfile = getProfile;
