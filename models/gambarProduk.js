

var mongoose = require('mongoose');

var gantiiniSchema = new mongoose.Schema({
	//jangan lupa diganti nama schema
	produk : String,
	pelanggan : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Pelanggan'
	}
});
mongoose.model('gantiini',gantiiniSchema);  


