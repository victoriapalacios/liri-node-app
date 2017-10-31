var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');

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
    var client = new Twitter(keys.twitterKeys);
    var params = {
      screen_name: 'TorieBootcamp',
      count: 20
    };
    client.get('statuses/user_timeline', params, function (tweets) {
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
  console.log("MOVIE");

   console.log("Title: ");
   console.log("Year: ");
   console.log("IMDB Rating: ");
   console.log("Rotten Tomatoes Rating: ");
   console.log("Country Produced: ");
   console.log("Laugnage: ");
   console.log("Plot: ");
   console.log("Actors: ");
};

// Below is a function for how we do a thing
function doAThing() {
  console.log("THING");
};
