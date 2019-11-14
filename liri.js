require("dotenv").config();

const keys = require('./keys.js');
const fs = require('fs')
const Spotify = require('node-spotify-api');
const axios = require('axios');

let spotify = new Spotify(keys.spotify);

function randomLIRI(){
    fs.readFile("random.txt", "utf8", (err, data) => {
      if (err) throw err;
      //console.log(data);
      spotifyLIRI("track",data);
    });
}

function spotifyLIRI(type,query){
    spotify
      .search({ type: type, query: query })
      .then(function(response) {
        //console.log(response.tracks.items[0]);
        let song = response.tracks.items[0]
        console.log(`==========================`)
        console.log(`Artist Name: ${song.artists[0].name}`)
        console.log(`Song Name: ${song.name}`)
        console.log(`Album Name: ${song.album.name} (${song.album.total_tracks} tracks)`)
        console.log(`Album Release Date: ${song.album.release_date}`)
        console.log(`Spotify Preview URL: ${song.external_urls.spotify}`)
        console.log(`==========================`)
      })
      .catch(function(err) {
        console.log(err);
      });
}

function omdbLIRI(query){
    axios
      .get(`http://www.omdbapi.com/?t=${query}&apikey=${keys.modules.omdb}`)
      .then(function(response) {
        // handle success
        //console.log(response.data);
        let movie = response.data
        console.log(`==========================`)
        console.log(`Title: ${movie.Title}`);
        console.log(`Rated: ${movie.Rated}`);
        console.log(`Release Date: ${movie.Released}`);
        console.log(`Runtime: ${movie.Runtime}`);
        console.log(`Genre: ${movie.Genre}`);
        console.log(`Language: ${movie.Language}`);
        console.log(`Country: ${movie.Country}`);
        console.log(`Actors: ${movie.Actors}`);
        console.log(`IMDB Rating: ${movie.Ratings[0].Value}`);
        console.log(`Rotten Tomatoes Rating: ${movie.Ratings[1].Value}`);
        console.log(`Plot: ${movie.Plot}`);
        console.log(`==========================`)
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
}

function bandsintownLIRI(query){
    axios
      .get(`https://rest.bandsintown.com/artists/${query}/events?app_id=${keys.modules.bandsintown}`)
      .then(function(response) {
        // handle success
        //console.log(response.data);
        let concerts = response.data
        for(i=0;i<concerts.length;i++){
            console.log(`Band/Artist Lineup: ${concerts[i].lineup}`)
            console.log(`Concert Venue: ${concerts[i].venue.name}`)
            console.log(`Date/Time: ${concerts[i].datetime}`)
            console.log(`==========================`)
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
}

//Logic to perform search
if(!process.argv[2]){
    console.log("You must enter an action for liri to perform, available actions are:");
    console.log("   1) spotify <song name>")
    console.log("   2) concert <artist>")
    console.log("   3) movie <movie title>")
    console.log("   4) random")
}
else {
    let searchTerm = process.argv[2].toLowerCase().trim()
    if(!process.argv[3] && searchTerm !="random"){
        console.log(`You must enter a search term for liri to a search on ${searchTerm}...`)
    }
    else{
        let searchQuery = ""
        if(process.argv[3]){searchQuery = process.argv[3].toLowerCase().trim()}
        switch(searchTerm){
            case "spotify":
            spotifyLIRI("track",searchQuery);
            break;

            case "concert":
            bandsintownLIRI(searchQuery);
            break;

            case "movie":
            omdbLIRI(searchQuery);
            break;

            case "random":
            randomLIRI();
            break;

            default:
                console.log("Search term entered was invalid, available actions are:")
                console.log("   1) spotify")
                console.log("   2) concert")
                console.log("   3) movie")
                console.log("   4) random")
        }
    }
}