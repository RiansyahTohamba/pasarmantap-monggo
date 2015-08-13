var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	produk : String,
	pelanggan : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Pelanggan'
	}
});
mongoose.model('Order',orderSchema);  


