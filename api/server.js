//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');

var app = express();


//routes
var cards     = require('./routes/cards.rts');
var decks      = require('./routes/decks.rts');


//config app routes
app.use('/cards',cards);
app.use('/decks',decks);


app.use(express.static(__dirname + './../app/'));


app.listen(8082,function(){
		console.log('Listening on http://127.0.0.1:%s',"8082");
		console.log('Stop Server With CTRL + C');
	});

// DataBase Init

mongoose.connect('mongodb://localhost/data/db/');

// Log to console any errors or a successful connection.
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log("Connected to db at /data/db/")
});

