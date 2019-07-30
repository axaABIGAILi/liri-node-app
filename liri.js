// requires dotenv to read .env file
require("dotenv").config();
// enables reading of keys file
var keys = require("./keys.js");
// spotify access
//var spotify = new Spotify(keys.spotify);
// bandsintown reqs
var BandsInTownEvents = require('bandsintown-events');
var Events = new BandsInTownEvents();
// inquirer
//var inquirer = require("inquirer");

/* commands:
- concert-this
- spotify-this-song
- movie-this
- do-what-it-says
*/

// variable to store artist input
var artist = process.argv[3];
// variable to store command
var command = process.argv[2];
// use object to set Events parameters
Events.setParams({
    "app_id":"LIRI APP", //can be anything
    "artists": artist
  });

// switch statement to evaluate the command and output appropriate
switch (command) {
  case 'concert-this':
    // code
    break;
  case 'spotify-this-song':
    // code
    break;
  case 'movie-this':
    // code
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