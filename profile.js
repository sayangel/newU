var bodylang = require('./bodylanguage.json')

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

exports.getProfile = getProfile;
