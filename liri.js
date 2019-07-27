// requires dotenv to read .env file
require("dotenv").config();
// enables reading of keys file
var keys = require("./keys.js");
// spotify access
var spotify = new Spotify(keys.spotify);

/* commands:
- concert-this
- spotify-this-song
- movie-this
- do-what-it-says
*/

// variable to store artist input
var artist = process.argv[3];

// switch statement to evaluate input and output appropriate data
switch (process.argv[2]) {
    case 'concert-this': 
        console.log();
        break;
    case 'spotify-this-song':
        console.log();
        break;
    case 'movie-this':
        console.log();
        break;
    case 'do-what-it-says':
        console.log();
        break;
};