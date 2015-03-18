var express = require('express');
var mongoose = require('mongoose');
var _ = require('underscore');

var router = express.Router();

var Room = mongoose.model('Room');

//Map a resource for rooms with a get and a post on URL localhost:3000/rooms
router.route('/')

	//Get all the rooms from the mongoose db
	//---------------------------------GET-----------------------------------
	.get(function(req, res, next) {
		Room.find(function(err, result){
		  	res.json(result); //Return all the rooms!
		});
	})

	//Post a new room and save it to the database
	//--------------------------------POST-----------------------------------
	.post(function(req, res, next) {

	 	var room = new Room(req.body.room);

	 	room.save(function(err, room){
	 		res.send({msg: "room with id" + room._id + " has succesfully been added."});
	 	});

	});

//Map a resource for rooms with a get, put and delete on URL localhost:3000/roooms/:id
router.route('/:id')

	//Delete a excisting room in the database
	//------------------------------DELETE-----------------------------------
	.delete(function(req, res, next) {
		Room.remove({ _id:req.params.id }, function(err){
		   	res.send({msg: "room with id" + req.params.id + " has succesfully been deleted."});
		});
	})

	//Update a excisting user in the database
	//--------------------------------PUT-----------------------------------
	.put(function(req, res, next) {

		//!############  Disclaimer: Werkt nog niet :( #####################

		//User.findOneAndUpdate({ _id:req.params.id }, req.body.user, options, function(err, user)
		//{
		//	res.send({msg:"user with id "+ user._id} + " has succesfully been updated ");
		//});

	
	})

	//Get a excisting room from the database
	//--------------------------------GET-----------------------------------
	.get(function(req, res, next) {
	  	Room.findOne({ _id:req.params.id }, function(err, room){
		   	res.send(room);
		});
	});


//Map a resource for the lines of a room with a post on URL localhost:3000/roooms/:id/lines
router.route('/:id/lines')

	//Post a new line to a collection of the lines of a room from the database
	//--------------------------------POST-----------------------------------
	.post(function(req, res, next){

		req.body.line.time = new Date();

		console.log("adding line to room with id " + req.params.id);

		Room.findByIdAndUpdate(
		    req.params.id,
		    {$push: {lines: req.body.line}},
		    {safe: true, upsert: true},
		    function(err, model) {
		 		res.send({msg: "lines from room with id " + req.params.id + " has succesfully been updated."})
		    }
		);
	})

	.get(function(req, res, next){
		Room.findOne({ _id:req.params.id }, function(err, room){

			var lines = _.sortBy(room.lines, 'time').reverse().slice(0, 8);
		   	res.send(lines.reverse());
		});
	});

module.exports = router;

