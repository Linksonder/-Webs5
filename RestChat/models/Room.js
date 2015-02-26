var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  name:  String,
  description: String,
  lines: [{
  		userId: String,
  		text: String,
  		time: Date
  }]
});

mongoose.model('Room', roomSchema);