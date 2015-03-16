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

	self.currentRoom.subscribe(function() {
    	self.refreshLines();
	});

	self.sendMessage = function()
	{
		var line = {
			username : self.currentUser().username,
			text: self.newLineText()
		};

		$.ajax({
		    url: '/rooms/' + self.currentRoom()._id + "/lines", 
		    type: 'POST', 
		    contentType: 'application/json', 
		    data: '{"line": ' + JSON.stringify(line) + "}",
		    success: function(result)
		    {
		    	self.refreshLines();
		    	self.newLineText("");
		    }
		});
	}

	self.refresh = function()
	{
		$.getJSON("/users", function(users) { 
			self.users(users); 

			if(!self.currentUser())
				self.currentUser(self.users()[0]);
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