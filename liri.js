require("dotenv").config();

var twitter = require("twitter");
var spotify = require("node-spotify-api");

var twitterKeys = require("./keys.js").twitter;
var spotifyKeys = require("./keys.js").spotify;

var client = new twitter(twitterKeys);
var spotifyNew = new spotify(spotifyKeys);

var fs = require("fs"); //file system setup

var input = process.argv; //global variable that takes in a user's console input

//console.log(client);
//console.log(spotifyNew);

//**************Twitter**********************

var params = {screen_name: 'nodejs'};

if (input[2] === "my-tweets") {

	client.get('statuses/user_timeline', function(error, tweets, response) {
		if(error) throw error;

		for (var i = 0; i < tweets.length; i++) {
				
			fs.appendFile("log.txt", `\nDate: ${tweets[i].created_at} \nMessage: ${tweets[i].text}`, function(error) {
				if (error) {
					console.log(error);
				};

			});	
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

			//consoles out the track name
			console.log(`Track name: ${data.tracks.items[0].name}`);

			//consoles out the album name
			console.log(`Album name: ${data.tracks.items[0].album.name}`); 

			//consoles out the link to the track
			console.log(`URL to song: ${data.tracks.items[0].external_urls.spotify}\n`);

			fs.appendFile('log.txt', `Spotify: \n Artist: ${data.tracks.items[0].artists[0].name} \n Track Name: ${data.tracks.items[0].name} \n Album name: ${data.tracks.items[0].album.name} \n Spotify URL: ${data.tracks.items[0].external_urls.spotify}\n`, 
				function(error) {

				if (error) {
					console.log(error);
				};

			});		
		});

	} else {

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

			fs.appendFile('log.txt', ` \n Spotify: \n Artist: ${data.tracks.items[0].artists[0].name} \n Track Name: ${data.tracks.items[0].name} \n Album name: ${data.tracks.items[0].album.name} \n Spotify URL: ${data.tracks.items[0].external_urls.spotify}\n`, 
				function(error) {

				if (error) {
					console.log(error);
				};

			});
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
	  		var title = `\nTitle: ${JSON.parse(body).Title}`;	
	    	console.log(title);

	    	//year movie made
	    	var year = `Year: ${JSON.parse(body).Year}`;
	    	console.log(year);


	    	//plot of the movie 
	    	var plot = `Plot: ${JSON.parse(body).Plot}`;
	    	console.log(plot);

	    	
	    	//actors in the movie
	    	var actors = `Actors: ${JSON.parse(body).Actors}`;
	    	console.log(actors);


	    	//imdb rating of the movie
	    	var imdb = `imdb Rating: ${JSON.parse(body).imdbRating}`
	    	console.log(imdb);

	    	//rotten tomatoes rating of the movie
	    	var rottenTomatoes = `Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}`
	    	console.log(rottenTomatoes);

	    	//country movie produced in 
	    	var countryProduced = `Country: ${JSON.parse(body).Country}`
	    	console.log(countryProduced);


	    	//languages movie translated in
	    	var language = `Language(s): ${JSON.parse(body).Language}`
	    	console.log(language);

		    	fs.appendFile('log.txt', ` \n OMDB: \n ${title} \n ${year} \n ${plot} \n ${actors} \n ${imdb} \n ${rottenTomatoes} \n ${countryProduced} \n ${language}\n`, 
					function(error) {

					if (error) {
						console.log(error);
					};

				});
	  		}
		});

	} else {

		var queryURL = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"

		request(queryURL, function(error, response, body) {

	  		if (!error && response.statusCode === 200) {

	  		//title of the movie
	  		var title = `\nTitle: ${JSON.parse(body).Title}`;	
	    	console.log(title);

	    	//year movie made
	    	var year = `Year: ${JSON.parse(body).Year}`;
	    	console.log(year);


	    	//plot of the movie 
	    	var plot = `Plot: ${JSON.parse(body).Plot}`;
	    	console.log(plot);

	    	
	    	//actors in the movie
	    	var actors = `Actors: ${JSON.parse(body).Actors}`;
	    	console.log(actors);


	    	//imdb rating of the movie
	    	var imdb = `imdb Rating: ${JSON.parse(body).imdbRating}`
	    	console.log(imdb);

	    	//rotten tomatoes rating of the movie
	    	var rottenTomatoes = `Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}`
	    	console.log(rottenTomatoes);

	    	//country movie produced in 
	    	var countryProduced = `Country: ${JSON.parse(body).Country}`
	    	console.log(countryProduced);


	    	//languages movie translated in
	    	var language = `Language(s): ${JSON.parse(body).Language}`
	    	console.log(language);

		    	fs.appendFile('log.txt', ` \n OMDB: \n ${title} \n ${year} \n ${plot} \n ${actors} \n ${imdb} \n ${rottenTomatoes} \n ${countryProduced} \n ${language}\n`, 
					function(error) {

					if (error) {
						console.log(error);
					};

				});
	  		}
		
		});
	
	}

};


//**************Do what it says!**********************

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

			fs.appendFile('log.txt', ` \n Spotify: \n Artist: ${data.tracks.items[0].artists[0].name} \n Track Name: ${data.tracks.items[0].name} \n Album name: ${data.tracks.items[0].album.name} \n Spotify URL: ${data.tracks.items[0].external_urls.spotify}\n`, 
				function(error) {

				if (error) {
					console.log(error);
				};

			});

		});

	});	

};