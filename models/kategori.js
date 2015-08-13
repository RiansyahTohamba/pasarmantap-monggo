var mongoose = require('mongoose');

var KategoriSchema = new mongoose.Schema({	
	kategori : String,
	produk : [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Produk'
	}]
});
mongoose.model('Kategori',KategoriSchema);  


