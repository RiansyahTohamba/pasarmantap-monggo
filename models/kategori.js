var mongoose = require('mongoose');

var KategoriSchema = new mongoose.Schema({	
	nama : String,
	deskripsi : {type : String, default: "isi kategori"},	
	url : {type : String, default: ""},	
	produk : [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Produk',default : null
	}]
});
mongoose.model('Kategori',KategoriSchema);  


