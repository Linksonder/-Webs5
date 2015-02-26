//Mapping for the list of rooms to view models
//----------------------------mapping----------------------------
var mapping = {
    'rooms': {
        create: function(options) {
            return new Room(options.data);
        }
    }
}

//Class for room with functions to update and delete
//---------------------------class Room--------------------------
function Room(data)
{
	var self = this;

	//model properties
	ko.mapping.fromJS(data, mapping, self);
	
	//View model properties
	self.isSelected = ko.observable(false);
	self.isNew = ko.observable(false);

	debugger;

	self.hasChanged = ko.computed(function(){
		var result = (self.name() != data.name || self.description() != data.description)
		return result;
	});
}

//Class for rooms overview 
//----------------------class RoomViewModel----------------------
function RoomViewModel()
{
	var self = this;

	self.rooms = ko.observableArray([]);
	self.currentRoom = ko.observable();

	//Method: Add the current room to the new field
	self.addRoom = function()
	{
		var room = ko.mapping.toJSON(self.currentRoom());

		$.ajax({
		    url: '/rooms', 
		    type: 'POST', 
		    contentType: 'application/json', 
		    data: '{"room": ' + room + "}",
		    success: function(result)
		    {
		    	self.refresh();
		    }
		});
	};

	self.selectRoom = function(room)
	{
		$.getJSON("/rooms/" + room._id() , function(room) { 
			self.currentRoom(new Room(room));
		});
	}

	
	//Method: Refresh current collection from server
	self.refresh = function()
	{
		$.getJSON("/rooms", function(rooms) { 
			self.rooms([]);
			ko.mapping.fromJS({rooms: rooms}, mapping, self);
		});
	}

	//Method: Turn the current user into a new user
	self.newRoom = function(){
		self.currentRoom(new Room({
			name: "",
		    description: ""
		}));
		self.currentRoom().isNew(true);
	};

	self.updateRoom = function()
	{
		//todo
	}

	self.removeRoom = function()
	{
		if(window.confirm("Are you sure you want to remove this room?")) 
		{
			$.ajax({
			    url: '/rooms/' + self.currentRoom()._id(),
			    type: 'DELETE',
			    success: function(result) {
			        self.refresh();
			        self.currentRoom(null);
			    }
			});
		}
	}

	//Init
	self.refresh();
}

