var express = require('express');
var mongoose = require('mongoose');
var HSDataBase = require('./models/HSDataBase');
var stuff = require('./models/HSctrl');
var request = require('request');

var app = express();
var save;
app.use(express.static(__dirname + './../app/'));

app.get('/test',function(req,res){
    console.log("yo2");
    request("https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                stuff.HSctrl(JSON.parse(body));
            }
    })
    
});

app.get('/getcards',function(req,res){
        HSDataBase.find({}, function(err, coffeeShops) {
        if (err) {
            console.log(err);
        } else {
            console.log(coffeeShops);
        }
    });
});

app.get('/drop',function(req,res){
        stuff.RemoveThing();
});

app.get('/card',function(req,res){
        stuff.getCard("Neptulon");
});

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

// newHSDataBase.save(function(err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Database! created!');
//     }
// });



// CoffeeShop.find({}, function(err, coffeeShops) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(coffeeShops);
//     }
// });

// CoffeeShop.find({"address": "460 King St. West2"}, function(err, shop) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(shop);
//     }
// });