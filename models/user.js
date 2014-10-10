var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/gwolves');

var userSchema = new Schema({
  username: {type: String, require: true, unique: true},
  password: String,
  count: {type: Number, default: 0}
});

userSchema.path('username').validate(function(v) {
  return 5 <= v.length && v.length <= 20;
}, "username length");

userSchema.path('password').validate(function(v) {
  return 8 <= v.length && v.length <= 20;
}, "password length");

userSchema.method('authenticate', function(password) {
  return password == this.password;
});

userSchema.method('incCount', function() {
  this.count++;
  this.save();
});

var userModel = mongoose.model('user', userSchema);

module.exports = mongoose.model('user');
