var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HSUserSchema = new Schema({
            id:Number,
            name: String,
            password: String,
            salt:String,
            email:String,
            token:String,
            created_at: Date,
            updated_at: Date

});

HSUserSchema.pre('save', function(next) {
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
var HSUser = mongoose.model('HSDecks', HSUserSchema);

 // Make this available to our Node applications.
module.exports = HSUser;