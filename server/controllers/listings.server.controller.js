
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

//save the coordinates (located in req.results if there is an address property) 
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
  

  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);

  // What does it look like? console.log(listing);

};

/* Update a listing - Complete the three tasks*/
exports.update = function(req, res) {
  var listing = req.listing;

  // What does it look like? console.log(listing);
  /* Replace the article's properties with the new properties found in req.body */
  /* save the coordinates (located in req.results if there is an address property) */

  if(req.body.code)
    listing.code = req.body.code;
  if(req.body.name)
    listing.name = req.body.name;
  if(req.body.address)
    listing.address = req.body.address;
  if(req.results){
    listing.coordinates = {latitude: req.results.lat, longitude: req.results.lng};
  }

  /* Save the article */
  listing.save(function(err){
    if(err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(listing);
    }
  });


};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /* Remove the article - Your Code*/
  listing.remove(function(err){
    if(err){
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(listing);
    }
  });

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
/* 
    https://stackoverflow.com/questions/5825520/in-mongoose-how-do-i-sort-by-date-node-js/15081087#15081087 
    For sorting descending, it's "-1" but ascending is "1"
    Room.find({}).sort([['date', -1]]).exec(function(err, docs) { ... });


*/
exports.list = function(req, res) {
  Listing.find({}).sort([['code', 1]]).exec(function(err,listings){
    if(err)
      res.status(404).send(err);
    else
      res.json(listing);
  });



};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};