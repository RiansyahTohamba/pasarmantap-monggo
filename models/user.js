var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	nama: String,	
	email : String,
	sandi : String,
});
mongoose.model('User',UserSchema);  


