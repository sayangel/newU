var bodylang = require('./bodylanguage.json')
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
  console.log(getBodyLang(personality));

  return profile;
};


function getBodyLang(personality)
{
  return bodylang[personality];
};

function getFirstLiner(){};

function getMusic(personality, archetype){};

function getMovies(personality, archetype){};

function getPolitics(personality, archetype){
  var part1 = politics.personality[personality];
};

function getHobbies(){};

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
