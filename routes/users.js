var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var User = mongoose.model('User');

//Map a resource for users with a get and a post on URL localhost:3000/users
router.route('/')

	//Get all the users from the mongoose db
	//---------------------------------GET-----------------------------------
	.get(function(req, res, next) {
		User.find(function(err, result){
		  	res.json(result); //Return all the users!
		});
	})

	//Post a new user and save it to the database
	//--------------------------------POST-----------------------------------
	.post(function(req, res, next) {

		console.log(req.body.user);

	 	var user = new User(req.body.user);

	 	

	 	user.save(function(err, user){
	 		res.send({msg: "user with id" + user._id + " has succesfully been added."});
	 	});

	});

//Map a resource for users with a get and a post on URL localhost:3000/users
router.route('/:id')

	//Delete a excisting user in the database
	//------------------------------DELETE-----------------------------------
	.delete(function(req, res, next) {
		User.remove({ _id:req.params.id }, function(err){
		   	res.send({msg: "user with id" + req.params.id + " has succesfully been deleted."});
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

	//Get a excisting user from the database
	//--------------------------------GET-----------------------------------
	.get(function(req, res, next) {
	  res.send('Get a specific user');
	});



module.exports = router;

