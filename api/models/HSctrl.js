var HSDataBase = require('./HSDataBase');

function HSctrl (input2) {
	console.log(input2);
	var array = input2;
	HSDataBase.create(array, function (err, candies) {
});

}
function RemoveThing (){
	HSDataBase.remove({}, function(err) { 
	   console.log('collection removed') 
	});
}

function getCard (name){
	HSDataBase.find({"name":name}, function(err, coffeeShops) {
    if (err) {
        console.log(err);
    } else {
        console.log(coffeeShops);
    }
});
}

module.exports.HSctrl = HSctrl;
module.exports.RemoveThing = RemoveThing;
module.exports.getCard = getCard;