var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email : String,
	sandi : String,
});
mongoose.model('User',UserSchema);  


