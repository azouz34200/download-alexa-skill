var alexa = require('alexa-app');
const url = "https://www.extreme-d0wn.com/rss.xml";
var app = new alexa.app();
app.launch(function(request, response){
 response.say("Bienvenue dans le skill extreme download  pouvez demandez les nouveautés !");
 response.shouldEndSession(false);
})
app.intent('GlobalIntent',
 {
  "slots": {},
  "utterances": []
 },
 function (request, response) {
  /*  var AmazonSpeech = require('ssml-builder/amazon_speech');
    var speech = new AmazonSpeech()
    .say('Bonjour')
    .pause('1s')
    .say("Les nouveautés sont :");*/
    
//speech.say("test");
    //Fonctionne
   /*return news_to_json(url).then(
    (result) => {response.say("ok")},
    (error) => {response.say("ko")}
  );
  */
 response.say("Bonjour");
 response.say('les nouveautés sont: ');
 return news_to_json(url).then( 
  (result) => {
    for (var news in result)
    {
  //  speech.say("ok news json")
response.say(result[news]["title"]) ; 
    }
}
); 
/*
 return news_to_json(url).then(res => {
  //  this.say("test");
  speech.say("ok");
  //this.emit(':responseReady'); 
  //  () => this.emit(':tell', 'Oops, something broke');
    for (var news in res)
    {
      speech.say(res[news]["title"]);
    }
})*/
/*
var speechOutput = speech.ssml();
response.say(speechOutput);*/
}
);
    
app.intent("AMAZON.HelpIntent", {
    "slots": {},
    "utterances": []
  },
  function(request, response) {
    var helpOutput = "Vous pouvez me demander les nouveautés sinon vous pouvez dire quitter pour sortir de l'application";
    var reprompt = "Que voulez-vous faire ?";
    // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
    response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
  }
);

app.intent("AMAZON.StopIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    var stopOutput = "Au revoir";
    response.say(stopOutput);
  }
);

app.intent("AMAZON.CancelIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    var cancelOutput = "Pas de problème, j'annule la demande";
    response.say(cancelOutput);
  }
);
const news_to_json = async url => {
    const fetch = require("node-fetch");
    var parser = require('xml2json');
    try {
      const response = await fetch(url);
      const retour = await response.text();
      const json =  JSON.parse(parser.toJson(retour));
     // console.log(json);
     const informations = json["rss"]["channel"]["item"];
    // console.log(informations);
     for (var news in informations)
     {
         console.log(informations[news]["title"]);
     }
      return informations;
      //console.log(retour);
      //console.log(json); 
     // return json;
    } catch (error) {
      console.log(error);
    }
  };


// Connect to lambda
exports.handler = app.lambda();
