var express = require('express');
var router = express.Router();
var Morder = require('../models/order.js');
var Order = require('mongoose').model('Order');

/* retrieve pelanggan */
router.get('/daftar',function(req, res, next) { 
        res.render('user/penjualan/daftarPenjualan', { 
          tabMenu: 'Daftar Transaksi Penjualan',             
        });  
});

router.get('/pesananbaru',function(req, res, next) { 
        res.render('user/penjualan/pesananBaru', { 
          tabMenu: 'Pesanan Baru',             
        });  
});

router.get('/konfirmasipengiriman',function(req, res, next) { 
        res.render('user/penjualan/konfirmasiPengiriman', { 
          tabMenu: 'Konfirmasi Pengiriman',             
        });  
});

router.get('/statuspengiriman',function(req, res, next) { 
        res.render('user/penjualan/statusPengiriman', { 
          tabMenu: 'Status Pengiriman',             
        });  
});

module.exports = router;
