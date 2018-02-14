require("dotenv").config();

var twitter = require("twitter");
var spotify = require("node-spotify-api");

var twitterKeys = require("./keys.js").twitter;
var spotifyKeys = require("./keys.js").spotify;

var client = new twitter(twitterKeys);
var spotifyNew = new spotify(spotifyKeys);

var input = process.argv; //global variable that takes in a user's console input


//console.log(client);
//console.log(spotifyNew);

//**************Twitter**********************

var params = {screen_name: 'nodejs'};

if (input[2] === "my-tweets") {

	client.get('statuses/user_timeline', function(error, tweets, response) {
		if(error) throw error;

		for (var i = 0; i < tweets.length; i++) {
			
			console.log(`\nDate created: ${tweets[i].created_at}`);//date created
			console.log(`Message: ${tweets[i].text}\n`);  // the tweets 
			//console.log(response);  // Raw response object. 

		};

	});
}


//**************Spotify**********************

if (input[2] === "spotify-this-song") {
	// console.log("it worked");

	//search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

	var track = "";

	for (var i = 3; i < input.length; i++) {
		track += ` ${input[i]}`		
	};
	
	if (track) {

		spotifyNew.search({ type:'track', query: track, limit: 1}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }

		//consoles out artist(s) name
		console.log(`\nArtist: ${data.tracks.items[0].artists[0].name}`); //set this up as a loop to get all artists' names 

		//consoles out the album name
		console.log(`Track name: ${data.tracks.items[0].name}`);

		//consoles out the album name
		console.log(`Album name: ${data.tracks.items[0].album.name}`); 

		//consoles out the link to the track
		console.log(`URL to song: ${data.tracks.items[0].external_urls.spotify}\n`);
		});

	}else {

		spotifyNew.search({ type:'track', query: "The Sign", limit: 1}, function(err, data) {
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
		});
	};
};


//**************OMDB**********************

var request = require("request");

if (input[2] === "movie-this") {

	var movieName = "";

	for (var i = 3; i < input.length; i++) {
		movieName += `${input[i]}+`
	}
	//console.log(movieName);

	if (movieName) {

		var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

		request(queryURL, function(error, response, body) {

	  		if (!error && response.statusCode === 200) {

	  		//title of the movie	
	    	console.log(`\nTitle: ${JSON.parse(body).Title}`);

	    	//year movie made
	    	console.log(`Year: ${JSON.parse(body).Year}`);


	    	//plot of the movie 
	    	console.log(`Plot: ${JSON.parse(body).Plot}`);

	    	
	    	//actors in the movie
	    	console.log(`Actors: ${JSON.parse(body).Actors}`);


	    	//imdb rating of the movie
	    	console.log(`imdb Rating: ${JSON.parse(body).imdbRating}`);

	    	//rotten tomatoes rating of the movie
	    	console.log(`Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}`);

	    	//country movie produced in 
	    	console.log(`Country: ${JSON.parse(body).Country}`);


	    	//languages movie translated in
	    	console.log(`Language(s): ${JSON.parse(body).Language}`);
	  		}
		});

	} else {

		var queryURL = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"

		request(queryURL, function(error, response, body) {

	  		if (!error && response.statusCode === 200) {

	  		//title of the movie	
	    	console.log(`\nTitle: ${JSON.parse(body).Title}`);

	    	//year movie made
	    	console.log(`Year: ${JSON.parse(body).Year}`);


	    	//plot of the movie 
	    	console.log(`Plot: ${JSON.parse(body).Plot}`);

	    	
	    	//actors in the movie
	    	console.log(`Actors: ${JSON.parse(body).Actors}`);


	    	//imdb rating of the movie
	    	console.log(`imdb Rating: ${JSON.parse(body).imdbRating}`);

	    	//rotten tomatoes rating of the movie
	    	console.log(`Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}`);

	    	//country movie produced in 
	    	console.log(`Country: ${JSON.parse(body).Country}`);


	    	//languages movie translated in
	    	console.log(`Language(s): ${JSON.parse(body).Language}`);
	  		}
		});
	}

};


//**************Do what it says!**********************

var fs = require("fs");

if (input[2] === "do-what-it-says") {

	fs.readFile("random.txt", "utf8", function(error,data){

		if (error) {
			console.log(error);
		};

		//console.log(data);

		spotifyNew.search({ type:'track', query: data, limit: 1}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }

		//consoles out artist(s) name
		console.log(`\nArtist: ${data.tracks.items[0].artists[0].name}`); //set this up as a loop to get all artists' names 

		//consoles out the album name
		console.log(`Track name: ${data.tracks.items[0].name}`);

		//consoles out the album name
		console.log(`Album name: ${data.tracks.items[0].album.name}`); 

		//consoles out the link to the track
		console.log(`URL to song: ${data.tracks.items[0].external_urls.spotify}\n`);

		// console.log(data.tracks.items[0].artists.name);

		});

	});	

};