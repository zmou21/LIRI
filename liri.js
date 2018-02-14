require("dotenv").config();

var twitter = require("twitter");
var spotify = require("node-spotify-api");

var twitterKeys = require("./keys.js").twitter;
var spotifyKeys = require("./keys.js").spotify;

var client = new twitter(twitterKeys);
var spotifyNew = new spotify(spotifyKeys);


//console.log(client);
//console.log(spotifyNew);

var params = {screen_name: 'nodejs'};

var input = process.argv;

if (input[2] === "my-tweets") {

	client.get('statuses/user_timeline', function(error, tweets, response) {
		if(error) throw error;

		console.log(`Date created: ${tweets[0].created_at}`);//date created
		console.log(`Message: ${tweets[0].text}`);  // The favorites. 
		//console.log(response);  // Raw response object. 
	});
}


if (input[2] === "spotify-this-song") {
	// console.log("it worked");

	//search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

	var track = "";

	for (var i = 3; i < input.length; i++) {
		track += ` ${input[i]}`		
	};

	
	spotifyNew.search({ type:'track', query: track, limit: 1}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	//consoles out artist(s) name
	console.log(`\nArtist: ${data.tracks.items[0].artists[0].name}`); 

	//consoles out the album name
	console.log(`Track name: ${data.tracks.items[0].name}`);

	//consoles out the album name
	console.log(`Album name: ${data.tracks.items[0].album.name}`); 

	//consoles out the link to the track
	console.log(`URL to song: ${data.tracks.items[0].external_urls.spotify}\n`);

	// console.log(data.tracks.items[0].artists.name);

	});
}






//console.log(client);