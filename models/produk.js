var mongoose = require('mongoose');
//pada mongoose,jika tampil di mongodb,schema yang baru dibuat ditambahkan huruf s(misalkan produk menjadi produks) 
var produkSchema = new mongoose.Schema({
	nama : String,
	harga : {type : Number, default: 0,min: 0, max:400000 },	
	
	berat : {type : Number, default: 0,min: 0, max:10000 },
	gambar : {type : String, default: '/images/produk/default.jpg',trim : true },
	kondisi : {type : String, default : 'Baru'},
	deskripsi : {type : String, default : 'Barang terbaru tahun ini'}
});
mongoose.model('Produk',produkSchema);  


