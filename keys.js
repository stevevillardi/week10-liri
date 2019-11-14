console.log('Loaded keys..');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.modules = {
    omdb: process.env.OMDB_API,
    bandsintown: process.env.BANDS_API
  };