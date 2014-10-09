var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/gwolves');

var userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  count: {type: Number, default: 0}
});

userSchema.method('authenticate', function(password) {
  return password === this.password;
});

userSchema.method('incCount', function() {
  this.count = this.count + 1;
});

var userModel = mongoose.model('user', userSchema);

module.exports = mongoose.model('user');
