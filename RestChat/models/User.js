var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  String,
  firstname: String,
  iconUrl:   String,
});

mongoose.model('User', userSchema);