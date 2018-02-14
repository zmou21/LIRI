require("dotenv").config();

var twitter = require("twitter");
var spotify = require("node-spotify-api");

var twitterKeys = require("./keys.js").twitter;
var spotifyKeys = require("./keys.js").spotify;

var spotifyNew = new Spotify(spotifyKeys);
var client = new Twitter(twitterKeys);