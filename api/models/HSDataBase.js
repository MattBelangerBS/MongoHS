var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HSDatabaseSchema = new Schema({
            id:Number,
            name:String,
            description:String,
            quality:String,
            category:String,
            mana:Number,
            attack:Number,
            health:Number,
            collectible:Boolean,
            image_url:String,
            effect_list:String,
            race:String,
            hero:String,
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


// Create a model using schema.
var HSDataBase = mongoose.model('HSDataBase', HSDatabaseSchema);

 // Make this available to our Node applications.
module.exports = HSDataBase;