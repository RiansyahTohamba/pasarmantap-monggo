var express = require('express');
var router = express.Router();
require('../models/produk.js');
var Produk = require('mongoose').model('Produk');
require('../models/kategori.js');
var Kategori = require('mongoose').model('Kategori');

router.get('/detail/:url/:id',function(req, res, next) {   
  Kategori.findOne({'url' : req.params.url})
  .populate({ path : 'produk',match : {'_id' :req.params.id} })
  .exec(function(err,kategori){            
        res.render('User/produk/detailProduk', {         
          title: 'ecommerce Barokah | Membantu jualan-mu',             
          kategori : kategori,          
          produk : kategori.produk
        });      
  });        
});

router.get('/caridaftar/:url',function(req, res, next) { 
  Kategori.findOne({'url' : req.params.url}).populate('produk')
  .exec(function(err,kategori){    
    res.render('User/produk/cariDaftarProduk', {         
      title: 'ecommerce Barokah | Membantu jualan-mu',             
      kategori : kategori,
      listProduk : kategori.produk
    });  
  });        
});

// tampilan form pengubahan pelanggan 
router.get('/ubah/:url/:id',function(req, res, next) {   
  Kategori.findOne({'url' : req.params.url})
  .populate({ path : 'produk',match : {'_id' :req.params.id} })
  .exec(function(err,kategori){        
    Kategori.find(function(err,listKategori){
        res.render('User/produk/ubahProduk', {         
          title: 'ecommerce Barokah | Membantu jualan-mu',             
          produk : kategori,
          listKategori : listKategori
        });  
    });
  });        
});


//jika gambar yang diubah, maka file gambar diserver dihapus
      //POST pengubahannya... yang berubah hanya diproduk saja,harus ada perubaha di kategori juga
      //produk undefined jika field diatas tidak lulus validasi                                    
      //jika kategori berubah maka objectId yang ada dikategori lama dihapus terlebih dahulu,dan dipindahkan(dipush) ke kategori lain
router.post('/cekubah',function(req, res, next) { 
    var multiparty = require('multiparty');
    var fs = require('fs');
    var form = new multiparty.Form();  
    var gantiSpace = require('string');

    form.parse(req,function(err,fields,files){

      if(err) res.send(err);
      else{      
        var img = files.gambar[0];          

        fs.readFile(img.path,function(err,data){
            img.originalFilename = gantiSpace(img.originalFilename).replaceAll(' ','-');
            var path = '../public/images/produk/'+img.originalFilename;            
                        
            fs.writeFile(path,data,function(err ){
                if(err) console.log(err);                
                var newProduk = new Produk({
                  nama : fields.nama,
                  harga : parseInt(fields.harga),             
                  berat : parseInt(fields.berat),
                  gambar : img.originalFilename,                  
                  kondisi : fields.kondisi,
                  deskripsi : fields.deskripsi,
                }).update(function(err,produk){
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

router.get('/daftar',function(req, res, next) { 
    //harus diuji jika benar-benar tidak ada produk yang dimiliki user, harusnya menampilkan alert 'tidak ada produk'
    Kategori.find({ produk: { $ne: null } }).populate('produk').exec(function(err,kategori){      
        if(err) console.log(err);
        else
          res.render('user/produk/daftarProduk', { 
            title: 'ecommerce Barokah | Membantu jualan-mu',    
            //kategori dibuat untuk semua array,bukan hanya array 0            
            kategori : kategori            
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
    var gantiSpace = require('string');

    form.parse(req,function(err,fields,files){

      if(err) res.send(err);
      else{      
        var img = files.gambar[0];          

        fs.readFile(img.path,function(err,data){
            img.originalFilename = gantiSpace(img.originalFilename).replaceAll(' ','-');
            var path = '../public/images/produk/'+img.originalFilename;            
                        
            fs.writeFile(path,data,function(err ){
                if(err) console.log(err);                
                //fields didapatkan dari form                    
                /* siapkan penanganan untuk 
                  > menghindari nama gambar yang sama 
                  > menghindani upload diluar gambar(.txt,.emd,dll)
                  > mengupload gambar dalam berbagai ukuran(300x400,100x200,dll)
                  > melakukan pengubahan terhadap produk
                */
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

module.exports = router;
