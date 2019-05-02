require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');


function spotifyThisSong(song) {
  spotify.search({ type: "track", query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    for (var i = 0; i < data.tracks.items[0].artists.length; i++){
        console.log(JSON.stringify("Artist(s): " + data.tracks.items[0].artists[i].name, null, 2));
    }
    console.log("Song's Name: " + data.tracks.items[0].name);
    console.log("Song Preview Link: " + data.tracks.items[0].external_urls.spotify);
    console.log("Album: " + data.tracks.items[0].album.name);
  });
}
// function to obtain information about a movie using axios promise function
function movieThis(movie){
    axios.get('http://www.omdbapi.com/?' + 't=' + movie + '&apikey=' + keys.omdb.key)
  .then(function (response) {
    console.log("Movie Title: " + response.data.Title);
    console.log("Year of Release: " + response.data.Released);
    console.log("IMDB Rating: " + response.data.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country of Production: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Movie Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  })
  .catch(function (error) {
    console.log(error);
  });
}
// function to obtain information about concerts for a specific band using axios promise function
function concertThis(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function (response) {
    console.log("Name of Venue: " + response.data[2].venue.name + "\nVenue Location: " + response.data[2].venue.city + "\nDate of Event: " + moment(response.data[2].venue.datetime).format("MMM Do YY"));
  })
  .catch(function (error) {
    console.log(error);
  });
}
// function that uses readFile() to print the contents of the data
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
    
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // print the contents of data
        console.log(data);
      
        // split it by commas (to make it more readable)
        var dataArr = data.split(",");
        console.log(dataArr);

      if (dataArr[0] === "spotify-this-song"){
          spotifyThisSong(dataArr[1]);
      } else if (dataArr[0] === "movie-this"){
          movieThis(data[1]);
      } else if (dataArr[0] === "concert-this"){
          concertThis(dataArr[1]);
      } 
      });
    
}
  
var command = process.argv[2];
if (command === "spotify-this-song") {
  spotifyThisSong(process.argv[3]);
} else if (command === "movie-this") {
    movieThis(process.argv[3]);
} else if (command === "do-what-it-says"){
    doWhatItSays();
} else if(command === "concert-this"){
    concertThis(process.argv[3]);
} else {
    console.log(error);
};
