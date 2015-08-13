var express = require('express');
var router = express.Router();
var Morder = require('../models/order.js');
var Order = require('mongoose').model('Order');
var Mpelanggan = require('../models/pelanggan.js');
var Pelanggan = require('mongoose').model('Pelanggan');


/* retrieve pelanggan */
router.get('/',function(req, res, next) { 
  Pelanggan.find( function(err,pelanggan) {    
      if(err) console.log(err);
      else
        res.render('pelanggan', { 
          title: 'ecommerce Barokah | Membantu jualan-mu',    
          listPlg : pelanggan
        });
    });        
});

//proses penambahan pelanggan
router.post('/post',function(req,res){
  var newPelanggan = new Pelanggan({
    nama : req.body.nama,
    saldo : req.body.saldo
  }).save(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('/pelanggan');
    }
  });      
});

// tampilan form pengubahan pelanggan 
router.get('/update/:id',function(req, res, next) {	
  Pelanggan.findById(req.params.id,function(err,pelanggan) {
  	if(err){
  		console.log(err);
  	}else{
		res.render('ubahPelanggan', { 
  			title: 'ecommerce Barokah | Membantu jualan-mu',  	
  			listPlg : pelanggan
	  	});
  	}
  }); 	  
});

//POST pengubahannya
router.post('/update/post',function(req, res, next) { 
  var newPelanggan = new Pelanggan({
    nama : req.body.nama,
    saldo : req.body.saldo
  }).update(function(err){  
    if(err){
      console.log(err);
    }else{
      res.redirect('/pelanggan');
    }
  });     
});

/* detail pelanggan */
router.get('/detail/:id',function(req, res, next) { 
  Pelanggan.findById(req.params.id,function(err,pelanggan) {
    if(err){
      console.log(err);
    }else{
      res.render('detailPelanggan', { 
        title: 'ecommerce Barokah | Membantu jualan-mu',   
        listPlg : pelanggan
      });
    }
  });     
});


module.exports = router;
