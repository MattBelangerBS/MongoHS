var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema.
// var coffeeShopSchema = new Schema({
//                         name: String,
//                         address: { 
//                           type: String, 
//                           required: true, 
//                           unique: true 
//                         },
//                         rating: {
//                           type: Number,
//                           max: 5,
//                           min: 0
//                         },
//                         created_at: Date,
//                         updated_at: Date
//                       });

var HSDatabaseSchema = new Schema({
            id:String,
            name:String,
            text:String,
            rarity:String,
            type:String,
            cost:Number,
            attack:Number,
            health:Number,
            collectible:Boolean,
            faction:String,
            flavor:String,
            mechanics:Array,
            dust:Array,
            race:String,
            artist:String,
            playerClass:String,
            created_at: Date,
            updated_at: Date

});

HSDatabaseSchema.pre('save', function(next) {
    // Get the current date.
    var currentDate = new Date();

    // Change the updated_at field to current date.
    this.updated_at = currentDate;

    // If created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    // Continue.
    next();
});


// HSDatabaseSchema.methods.summary = function() {
//     // Construct and return summary.
//     var summary = this.name + "\n" + this.address + "\nRating: " + this.rating; 
//     return summary;
// };


// Create a model using schema.
var HSDataBase = mongoose.model('HSDataBase', HSDatabaseSchema);

 // Make this available to our Node applications.
module.exports = HSDataBase;