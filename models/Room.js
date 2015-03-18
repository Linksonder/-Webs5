var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  name:  String,
  description: String,
  lines: [{
  		username: String,
  		text: String,
  		time: Date
  }]
});

console.log('model set');


mongoose.model('Room', roomSchema);