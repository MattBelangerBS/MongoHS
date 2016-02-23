//Database
var HSDataBase = require('./HSDataBase');
var q = require('q');
var fs = require('fs'),
	request = require('request');

//global
var CARDS;

//controllers
function HSctrl (input2) {
	console.log(input2.cards);
	var array = input2.cards;
	HSDataBase.create(array, function (err, candies) {
	});

}

function RemoveThing (){
	HSDataBase.remove({}, function(err) { 
	   console.log('collection removed') 
	});
}

function getCard (name){
	HSDataBase.find({"name":name}, function(err, card) {
	    if (err) {
	        console.log(err);
	        return(err);
	    } else {
	        console.log(card);

	        return(card);
	    }
	});
}

function getCardImage (image){
	HSDataBase.find({"image_url":image}, function(err, card) {
    	if (err) {
	        console.log(err);
	        return(err);
	    } else {
	        console.log(card);

	        return(card);
	    }
	});
}

function getCards(){
    var deferred = q.defer();
    
	HSDataBase.find({}, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            //console.log(res);
            deferred.resolve(res);
        }
    });
     return deferred.promise;
};


module.exports.HSctrl = HSctrl;
module.exports.RemoveThing = RemoveThing;
module.exports.getCard = getCard;
module.exports.getCardImage = getCardImage;
module.exports.getCards = getCards;

