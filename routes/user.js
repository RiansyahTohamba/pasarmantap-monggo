var express = require('express');
var router = express.Router();
require('../models/user.js');
var User = require('mongoose').model('User');
require('../models/pelanggan.js');
var Pelanggan = require('mongoose').model('Pelanggan');
require('../models/indonesia.js');
var Provinsi = require('mongoose').model('Provinsi');
var Kabupaten = require('mongoose').model('Kabupaten');
var Kecamatan = require('mongoose').model('Kecamatan');
var async = require('async');



router.get('/login',function(req, res, next) {
    /*kalau sudah diperbaiki susunan file viewsnya(pendaftaranUser,header,masuk),
      keluarkan semua file view dari folder viewsContoh
    */
    res.render('login', {
        title: 'ecommerce Barokah | Login',
        salah : ''
    });      
});

router.get('/signup',function(req, res, next) { 
    res.render('viewsContoh/signup', { 
        title: 'ecommerce Barokah | Login',           
    });      
});

router.get('/login',function(req, res, next) { 
    res.render('login', {
        title: 'ecommerce Barokah | Login',           
    });      
});

router.get('/logout',function(req, res, next) {
    req.session.destroy();
    res.redirect('/login');
});

//tidak boleh ada module.export jika sudah sudah ada 1 export ini (ceklogin)
router.get('/',function(req, res, next) { 
    res.render('masuk', {
        title: 'ecommerce Barokah | Login',           
    });      
});


router.post('/ceklogin',function(req, res, next) {
    User.findOne( {'email' : req.body.email,'sandi' : req.body.sandi},'nama',function(err, user) {
        if (!err) {
          if (!user){
            res.render('login',{alert : 'email dan sandi yang dimasukkan salah'});
          }else{
            req.session.nama =  user.nama;
            req.session.loggedin = "true";
            res.redirect( '/beranda' );
          }
        }else throw err;
     });
});


router.get('/daftar',function(req, res, next) {
    Provinsi.getListProvinsi(function(err,result){
        res.render('pendaftaranUser', {
            title: 'ecommerce Barokah | Pendaftaran baru',
            listProv : result
        });
    });
});

router.get('/getkabupaten/:idprov',function(req, res) {
    Provinsi.getListKabupaten(req.params.idprov,function(err,result){
        var kabupatenHTML = [];
        //console.log(result); debug hasilnya
        var listKabupaten = result.kabupaten;

        for(var val in listKabupaten){
            kabupatenHTML[val] = "<option value="+listKabupaten[val]._id+">" +
                listKabupaten[val].kabupaten+"</option>";
        }
        res.send({listArr:kabupatenHTML});
    });
});

router.get('/getkecamatan/:idkab',function(req, res) {
    Kabupaten.getListKecamatan(req.params.idkab,function(err,result){
        var kecamatanHTML = [];
        var listKecamatan = result.kecamatan;

        for(var val in listKecamatan){
            kecamatanHTML[val] = "<option value="+listKecamatan[val]._id+">" +
                listKecamatan[val].kecamatan+"</option>";
        }
        res.send({listArr:kecamatanHTML});
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
    res.render('user/beranda', {
        title: 'ecommerce Barokah | Membantu jualan-mu',
        nama : req.session.nama
    });
});

//query penguji apakah kabupaten bisa diambil atau tidak
//Kabupaten.find()
//    .populate({ path : 'kecamatan' })
//    .exec(function(err,result){
//        console.log(result)
//    });
//menginput kecamatan ke collection kabupaten menggunakan method inputKabupaten(ID) dibawah
//Kabupaten.find(function(err,kb){
//    for(val in kb){
//        inputKabupaten(kb[val].IDKabupaten);
//    }
//});
//function inputKabupaten(ID){
//    var IDKec = [];
//    async.series([
//        function(callback){
//            Kecamatan.find({'IDKabupaten' : ID},function(err,kc){
//                //kosong kecamatannya, di export json dulu dari tabel mysql
//                console.log(kc);
//                for(val in kc){
//                    IDKec[val] = kc[val]._id;
//                    console.log(kc[val]);
//                }
//                callback();
//            });
//        },
//        function(callback){
//            Kabupaten.findOne({'IDKabupaten' : ID},
//                function(err,prov){
//                    for(var n = 0;n<IDKec.length;n++){
//                        prov.kecamatan.push(IDKec[n]);
//                    }
//                    prov.save();
//                    console.log(prov);
//                    callback();
//                });
//        }
//    ],function(err){
//    });
//}

module.exports = router;
