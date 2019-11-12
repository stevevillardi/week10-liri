require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');


let spotify = new Spotify(keys.spotify);

spotify
    .search({ type: 'artist', query: 'U2' })
    .then(function(response) {
    console.log(response);
    })
    .catch(function(err) {
    console.log(err);
    });

axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=trilogy')
    .then(function (response) {
    // handle success
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    });

axios.get('https://rest.bandsintown.com/artists/U2?app_id=codingbootcamp')
    .then(function (response) {
    // handle success
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    });


    