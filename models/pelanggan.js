var mongoose = require('mongoose');

var pelangganSchema = new mongoose.Schema({
	nama : String,
	saldo : String
});
mongoose.model('Pelanggan',pelangganSchema);  


