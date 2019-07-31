// requires dotenv to read .env file
require("dotenv").config();
// enables reading of keys file
var keys = require("./keys.js");
// spotify access
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// bandsintown reqs
var moment = require('moment');
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

// Store commands in functions so they can be called multiple times
// spotify call function
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

// OMDB / axios call funciton
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

// BandsInTown / axios call function
function bandsInTown () {
  axios.get(queryURL)
    .then(function(res) {
      console.log(res.data[0].venue.name);
      console.log(res.data[0].venue.city+', '+res.data[0].venue.country);
      console.log(moment(res.data[0].datetime).format('MM/DD/YYYY'));
    })
}

// variable to store artist input
var input = process.argv[3];
// variable to store command
var command = process.argv[2];
// variable to store queryURLs
var queryURL;

//log commands into log.txt file using fs
fs.appendFile('log.txt', '\n'+command+', '+input, (err) => {
  if (err) {console.log(err)}
  else {console.log('Command logged!')}
});

// switch statement to evaluate the command and output appropriate
switch (command) {
  case 'concert-this':
    input = input.split(' ').join('+');
    queryURL = 'https://rest.bandsintown.com/artists/'+input+'/events?app_id=codingbootcamp';
    bandsInTown();
    break;
  case 'spotify-this-song':
    // spotify code
    spotifySearch();
    break;
  case 'movie-this':
    // code for OMDB Api
    input = input.split(' ').join('+');
    queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t='+input+'&plot=short';
    OMDB();
    break;
  case 'do-what-it-says':
    // read file with fs
    fs.readFile('random.txt', 'utf8', (err, data) => {
      if (err) {
        console.log (err)
      }
      // parse data into an array so it can be called upon/used
      console.log(data);
      var dataSplit = data.split(',');
      // console.log(dataSplit); <-- to check functionality of the split
      // define dataSplit[1] as input so it can be used in the functions
      input = dataSplit[1];
      // nested switch statement to evaluate the txt file's first entry
      switch (dataSplit[0]) {
        case 'concert-this':
          input = input.split(' ').join('+');
          queryURL = 'https://rest.bandsintown.com/artists/'+input+'/events?app_id=codingbootcamp';
          bandsInTown();
          break;
        case 'spotify-this-song':
          spotifySearch();
          break;
        case 'movie-this':
            input = input.split(' ').join('+');
            queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t='+input+'&plot=short';
          OMDB();
          break;
      }
    });
    break;
}