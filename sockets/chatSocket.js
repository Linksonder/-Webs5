var mongoose = require('mongoose');
var Room = mongoose.model('Room');

module.exports = function(server){

	var io = require('socket.io')(server);

	io.on('connection', function(socket){

		socket.on('join room', function(invite){

			/** Leave old room **/			
			if(socket.roomId)
			{
				socket.leave(socket.roomId);
				io.to(socket.roomId).emit("admin msg", socket.username + " just left the room");
			}


			/** Join new room **/
			socket.join(invite.roomId);
			socket.roomId = invite.roomId;
			socket.username = invite.username;
			io.to(socket.roomId).emit('admin msg', invite.username + " just joined the room");

			console.log(socket.username + ' just joined room with id ' + socket.roomId);
			
		
		});

		/** tempje **/
		socket.on('switch user', function(username){
			
			io.to(socket.roomId).emit("admin msg", socket.username + "just left the room");
			socket.username = username;
			io.to(socket.roomId).emit("admin msg", socket.username + "just joined the room");

		});


		socket.on('chat msg', function(msg){

			var line = {
				time : new Date(),
				text : msg, 
				username : socket.username
			};



			Room.findByIdAndUpdate(
			    socket.roomId,
			    {$push: {lines: line}},
			    {safe: true, upsert: true},
			    function(err, model) {
			    	console.log(socket.username + ' just send message to room ' + socket.roomId);
			 		io.to(socket.roomId).emit('chat msg', line);
			    }
			);

		});
	  	
		socket.on('disconnect', function(){
		    socket.leave(socket.roomId);
			io.to(socket.roomId).emit("admin msg", socket.username + "just left the room");
		});
	});

}