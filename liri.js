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
// file system integration
var fs = require('fs');

// store spotify call into a function so it can be called in multiple places
function spotifySearch () {
  spotify.search({ type: 'track', query: input }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log(data); 
  });
}

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
      "app_id":"LIRI APP",
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
    spotifySearch();
    break;
  case 'movie-this':
    // code for OMDB Api
    input = input.split(' ').join('+');
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
    fs.readFile('random.txt', (err, data) => {
      if (err) {
        console.log (err)
      }
      data.split(',');
      command = data[0];
      input = data[1];
      spotifySearch();
    });
    break;
}