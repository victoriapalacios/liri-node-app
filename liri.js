var Twitter = require('twitter');
var keys = require('./keys.js');
var client = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('file-system');

// Below is where we collect the users command, which will be "my-tweets", "spotify-this-song", "movie-this" or "do-what-it-says"
 var command = process.argv[2];

 // Take in the command line arguments
var nodeArgs = process.argv;
// Create an empty string for holding the address
var userInput = "";
// Capture all the words in the address (again ignoring the first two Node arguments)
for (var i = 3; i < nodeArgs.length; i++) {
  // Build a string with the address.
  userInput = userInput + " " + nodeArgs[i];
  //console.log(songInput);
}

// Below is a switch case statement that will call a function based on the users command
switch(command) {
  case "my-tweets":
    displayTweets();
  break;

  case "spotify-this-song":
    spotifySong();
  break;

  case "movie-this":
    movieThis();
  break;

  case "do-what-it-says":
    doAThing();
  break;

  default: console.log("Please enter a command: my-tweets, spotify-this-song, movie-this, or do-what-it-says.")
  break;
}


// Below is a function for how we display up to 20 tweets
function displayTweets() {
    var params = {
      screen_name: 'TorieBootcamp',
      count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

      for (var i = 0; i < tweets.length; i++) {
          console.log(' Tweet: ' + tweets[i].text)
      }
    });
}

// Below is a function for how we call to the spotify API to get song info
function spotifySong() {

  var spotify = new Spotify({
    id: '755239199df34f3ca84bcc60b434a4b7',
    secret: 'ccda4ce896f7491ca24e3fcb7b027ff1'
  });

  spotify.search({ type: 'track', query: userInput }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      console.log("Song Name: " + data.tracks.items[0].name );
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name );
      console.log("Album: " + data.tracks.items[0].album.name );
      console.log("Preview Link: " + data.tracks.items[0].preview_url );
    }
  });
};

// Below is a function for how we call to the movie API
function movieThis() {
  // Below is how we use request to access the OMDB API
  request('http://www.omdbapi.com/?apikey=40e9cece&t=' + userInput, function (error, response, body, movie) {
    //console.log('error:', error);
    //console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);

   var body = JSON.parse(body);

   console.log("Title: " + body.Title);
   console.log("Year: " + body.Year);
   console.log("IMDB Rating: " + body.imdbRating);
   console.log("Rotten Tomatoes Rating: " + body.imdbRating);
   console.log("Country Produced: " + body.Country);
   console.log("Laugnage: " + body.Language);
   console.log("Plot: " + body.Plot);
   console.log("Actors: " + body.Actors);
  });
};

// Below is a function for how we do a thing
function doAThing() {
  //console.log("THING");
  fs.readFile('random.txt', "utf8", function(error, data){

  if (error) {
    return console.log(error);
  }

  var fileCommands = data.split(',');
  command(fileCommands[0], fileCommands[1]);

  });
};
