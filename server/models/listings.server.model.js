//You can replace this entire file with your Bootcamp Assignment #3 - ListingSchema.js File

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */


var listingSchema = new Schema({

  /* Some listings have fields missing from one or more of the attributes
	attribute # 1) code
	attribute # 2) name
	attribute # 3) coordinates -> subattributes [latitude, longitude]
	attribute # 4) address
 */


	code: String,
	name: String,
	coordinates: [{latitude: Number, longitude: Number}],
	address: String

});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
listingSchema.pre('save', function(next) {


	// Create a Date object and initialize it to today's date
	var currentDate = new Date();


	// Set the listing's update_at date to currentDate
	this.updated_at = currentDate;


	// If the listing's created_at date doesn't exit, then update it to current date
	if(!this.created_at)
		this.created_at = currentDate;

	// If the listing's attributes code or name is missing, then fill it in
	if(this.code == null || this.name == null)
		return sizeBy.json({success: false, message: 'Listing is incomplete'});


	next();


});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;