require("dotenv").config();
var keys = require("./key");
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
var search = process.argv[2];
var find = process.argv.splice(3).join(" ");


switch (search) {
  case "concert-this":
    concertThis()
    break;
  case "movie-this":
    movieThis();
    break;

}


function concertThis() {
  var artist = find;
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(
      function (response) {
        var details = response.data;
        details.forEach(function (element) {
          var date = moment(element.datetime).format('L');
          var concertResponse = "Venue: " + element.venue.name + "\nLocation: " + element.venue.city + ", " + element.venue.region + " " + element.venue.country + "\nDate: " + date + "\n";
          console.log(concertResponse);
          fs.appendFile("log.txt", concertResponse, function (err) {
            if (err) {
              return console.log(err);
            }
          })
        })
      });
};

function getMovie() {
  var movie=find;
  axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy")
    .then(
      function (response) {
        var details = response.data;
        var movieResponse = "Title: " + details.Title + "\nYear: " + details.Year + "\nIMDB Rating: " + details.Ratings[0].Value + "\nRotten Tomatoes Rating: " + details.Ratings[1].Value + "\nCountry: " + details.Country + "\nLanguage: " + details.Language + "\nPlot: " + details.plot + "\nActors: " + details.Actors + "\n";
        console.log(movieResponse);
        fs.appendFile("log.txt", movieResponse, function (err) {
          if (err) {
            return console.log(err);
          }
        })
      });
}

function movieThis() {
  var movie;
  if (!find) {
    movie = "Mr. Nobody";
    getMovie();
  } else {
    movie = find;
    getMovie();
  }
};

function spotifyThis (){

}


