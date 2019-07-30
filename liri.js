// requires dotenv to read .env file
require("dotenv").config();
// enables reading of keys file
var keys = require("./keys.js");
// spotify access
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// bandsintown reqs
var BandsInTownEvents = require('bandsintown-events');
var Events = new BandsInTownEvents();
// axios integration
var axios = require('axios');

/* commands:
- concert-this
- spotify-this-song
- movie-this
- do-what-it-says
*/

// variable to store artist input
var input = process.argv[3];
// variable to store command
var command = process.argv[2];

// switch statement to evaluate the command and output appropriate
switch (command) {
  case 'concert-this':
    Events.setParams({
      "app_id":"LIRI APP", //can be anything
      "artists": input
    });
    Events.getEvents(function(events){
      for(var i = 0; i < events.length; i++){
        console.log( events[i].venue.city + ", " + events[i].venue.region );
      }
    },function(errors){
      console.log(errors);
    });
    break;
  case 'spotify-this-song':
    // spotify code
    spotify.search({ type: 'track', query: input }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    console.log(data); 
    });
    break;
  case 'movie-this':
    // code for OMDB Api
    var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t='+input+'&plot=short';
    axios.get(queryURL)
      .then(function (response){
        console.log(response.Title);
        console.log(response.Year);
        console.log('IMDB: '+response.Ratings[0].Value);
        console.log('Rotten Tomatoes: '+response.Ratings[1].Value);
        console.log(response.Country);
        console.log(response.Language);
        console.log(response.Plot);
        console.log(response.Actors);
      });
    break;
  case 'do-what-it-says':
    // code
    break;
}

// start w/ first command 'concert this' 
Events.getEvents(function(events) {
    console.log(events);
});

// inquirer 