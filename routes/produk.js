var express = require('express');
var router = express.Router();
require('../models/produk.js');
var Produk = require('mongoose').model('Produk');
require('../models/kategori.js');
var Kategori = require('mongoose').model('Kategori');

function tambahProduk(judulBuku){
      var newProduk = new Produk({
        nama : judulBuku,        
        harga : 100000,
      }).save(function(err){        

      });
}

function tambahKategori(kategori){
      var newKategori = new Kategori({
        kategori : kategori                
      }).save(function(err){        

      });
}

function tambahBukuKategori(){
  Kategori.find({kategori : 'Buku'},function(err,kategori){                
    Produk.find(function(err,produk){
      for(var n = 0; n< produk.length;n++){        
        kategori[0].produk.push(produk[n]['_id']);
        kategori[0].save();
      }
    });        
  });
}

router.get('/dummy',function(req, res, next) { 
    // populate datanya
    // tambahKategori('Buku');
    // tambahBukuKategori();
    Produk.find(function(err,produk){
      console.log(produk[0]._id)
    });       
});

router.get('/daftar',function(req, res, next) { 
    Produk.find( function(err,produk) {    
        if(err) console.log(err);
        else
          res.render('user/produk/daftarProduk', { 
            title: 'ecommerce Barokah | Membantu jualan-mu',    
            listProduk : produk
          });
      });        
});

router.get('/tambah',function(req, res, next) { 
  Kategori.find( function(err,kategori) {    
      if(err) console.log(err);
      else        
        res.render('user/produk/tambahProduk', { 
          title: 'ecommerce Barokah | Membantu jualan-mu',    
          listKategori : kategori,          
        });
    });        
});  

router.post('/cektambah',function(req, res, next) { 
    var multiparty = require('multiparty');
    var fs = require('fs');
    var form = new multiparty.Form();  

    form.parse(req,function(err,fields,files){

      if(err) res.send(err);
      else{      
        var img = files.gambar[0];          

        fs.readFile(img.path,function(err,data){
            var path = '../public/images/produk/'+img.originalFilename;
            //persiapakan untuk menangani white space (diganti dengan '-') pada nama gambar
                        
            fs.writeFile(path,data,function(err ){
                if(err) console.log(err);                
                // fields didapatkan dari form    

                //produk disave dulu, lalu id produk dipush ke kategori                  
                console.log(parseInt(fields.harga));
                var newProduk = new Produk({
                  nama : fields.nama,
                  harga : parseInt(fields.harga),             
                  berat : parseInt(fields.berat),
                  gambar : img.originalFilename,                  
                  kondisi : fields.kondisi,
                  deskripsi : fields.deskripsi,
                }).save(function(err,produk){
                  //produk undefined jika field diatas tidak lulus validasi                                    
                  Kategori.findById(fields.kategori,function(err,kategori){
                    kategori.produk.push(produk._id);
                    kategori.save(function(err){
                      if(err) console.log(err);                    
                      res.redirect('/produk/tambah');                                        
                    });
                  });
                });                
            });          
        });
      }
    });      
});  

router.get('/caridaftar/:url',function(req, res, next) { 
  Kategori.findOne({'url' : req.params.url}).populate('produk').exec(function(err,kategori){
    res.render('User/produk/cariDaftarProduk', {         
      title: 'ecommerce Barokah | Membantu jualan-mu',             
      kategori : kategori.kategori,
      listProduk : kategori.produk
    });  
  });        
});

module.exports = router;
