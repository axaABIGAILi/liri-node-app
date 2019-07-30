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

/* commands:
- concert-this
- spotify-this-song
- movie-this
- do-what-it-says
*/

// store spotify call into a function so it can be called in multiple places
function spotifySearch () {
  spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } 
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].href);
    console.log(data.tracks.items[0].album.name);
  });
}

// store OMDB call into a funciton
function OMDB () {
  axios.get(queryURL)
      .then(function (response){
        // console log appropriate information
        console.log(response.data.Title);
        console.log(response.data.Ratings[0].Source+': '+response.data.Ratings[0].Value);
        console.log(response.data.Ratings[1].Source+': '+response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
      });
}

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
    OMDB();
    break;
  case 'do-what-it-says':
    fs.readFile('random.txt', 'utf8', (err, data) => {
      if (err) {
        console.log (err)
      }
      console.log(data);
      var dataSplit = data.split(',');
      // console.log(dataSplit); <-- to check functionality of the split
      input = dataSplit[1];
      //command = dataSplit[0];
      // nested case statement to evaluate the txt file's first entry
      switch (dataSplit[0]) {
        case 'concert-this':
          // concert code
          break;
        case 'spotify-this-song':
          spotifySearch();
          break;
        case 'movie-this':
          OMDB();
          break;
      }

    });
    break;
}

//function commandCheck ()