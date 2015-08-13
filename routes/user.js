var express = require('express');
var router = express.Router();
var Muser = require('../models/user.js');
var User = require('mongoose').model('User');
var Mpelanggan = require('../models/pelanggan.js');
var Pelanggan = require('mongoose').model('Pelanggan');


//tidak boleh ada module.export jika sudah sudah ada 1 export ini (ceklogin)
router.get('/',function(req, res, next) { 
    res.render('masuk', { 
        title: 'ecommerce Barokah | Login',           
    });      
});

router.get('/keluar',function(req, res, next) { 
    req.session.destroy();    
    res.redirect('/');
});

router.post('/cekLogin',function(req, res, next) {   
    User.findOne( {'email' : req.body.email,'sandi' : req.body.sandi},'_id email',function(err, user) {
        if (!err) {
          if (!user){
            res.send('email dan sandi yang dimasukkan salah');
          }else{
            req.session.user = {"email": user.email, "_id": user._id};
            req.session.loggedin = "true";
            console.log('Logged in user: ' + user);
            res.redirect( '/pelanggan' );  
          }
        }else throw err;
     });  
});

router.get('/daftar',function(req, res, next) { 
  res.render('pendaftaranUser', { 
      title: 'ecommerce Barokah | Pendaftaran baru',                   
  });      
});

router.post('/daftarBaru',function(req, res, next) { 
  var newUser = new User({
    email : req.body.emailBaru,
    sandi : req.body.sandiBaru
  }).save(function(err){
    if(err){
      console.log(err);
    }else{      
      res.redirect('beranda');
    }
  });      
});

router.get('/beranda',function(req, res, next) { 
  Pelanggan.find( function(err,pelanggan) {    
      if(err) console.log(err);
      else
        res.render('user/beranda', { 
          title: 'ecommerce Barokah | Membantu jualan-mu',    
          listPlg : pelanggan
        });
    });        
});

module.exports = router;
