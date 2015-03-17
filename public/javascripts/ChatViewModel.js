ko.bindingHandlers.enterkey = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var allBindings = allBindingsAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                allBindings.enterkey.call(viewModel);
                return false;
            }
            return true;
        });
    }
};



function ChatViewModel()
{
	var self = this;

	self.newLineText = ko.observable();

	self.users = ko.observableArray();
	self.rooms = ko. observableArray();
	self.currentUser =  ko.observable();
	self.currentRoom = ko.observable();
	self.lines = ko.observableArray();

	self.currentRoom.subscribe(function(newValue) {

		var username = self.currentUser() ? self.currentUser().username : "";
		socket.emit('join room', {username: username, roomId: newValue._id});
    	self.refreshLines();
	
	});

	self.currentUser.subscribe(function(newValue) {

		var username = self.currentUser() ? self.currentUser().username : "";
		socket.emit('switch user', username);

	});

	/** SOCKET EVENTS **/
	socket.on('admin msg', function(msg){
		self.lines.push({username: 'Admin', text: '### ' + msg + ' ###'});
	});

	socket.on('chat msg', function(line){
		self.lines.push(line);
	});


	self.sendMessage = function()
	{
		socket.emit('chat msg', self.newLineText());
		self.newLineText('');
	}

	self.leaveRoom = function()
	{
		self.currentUser("");
		socket.emit('join room', {username: null, roomId: currentRoom()._id});
	}

	self.refresh = function()
	{
		$.getJSON("/users", function(users) { 
			self.users(users); 

		});

		$.getJSON("/rooms", function(rooms) { 
			self.rooms(rooms); 
			if(!self.currentRoom())
				self.currentRoom(self.rooms()[0]);
		});

	}

	self.refreshLines = function()
	{
		$.getJSON("/rooms/" + self.currentRoom()._id + "/lines", function(lines) { 
			self.lines(lines);
		});
	}

	//Init
	self.refresh();
}