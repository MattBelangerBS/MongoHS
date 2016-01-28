var express = require('express');
var mongoose = require('mongoose');
var CoffeeShop = require('./models/CoffeeShop');

var app = express();

app.use(express.static(__dirname + './../app/'));



app.listen(8082,function(){
		console.log('Listening on http://127.0.0.1:%s',"8082");
		console.log('Stop Server With CTRL + C');
	});


// mongoooooseeee


mongoose.connect('mongodb://localhost/data/db/');

// Log to console any errors or a successful connection.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to db at /data/db/")
});





// var newCoffeeShop = CoffeeShop(
//     {
//         name: "Quantum2",
//         address: "460 King St. West2",
//         rating: 4
//     }
// );

// newCoffeeShop.save(function(err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('User created!');
//     }
// });



CoffeeShop.find({}, function(err, coffeeShops) {
    if (err) {
        console.log(err);
    } else {
        console.log(coffeeShops);
    }
});

CoffeeShop.find({"address": "460 King St. West2"}, function(err, shop) {
    if (err) {
        console.log(err);
    } else {
        console.log(shop);
    }
});