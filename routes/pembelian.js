var express = require('express');
var router = express.Router();
var Morder = require('../models/order.js');
var Order = require('mongoose').model('Order');

/* retrieve pelanggan */
router.get('/daftar',function(req, res, next) { 
        res.render('user/pembelian/daftarPembelian', { 
          tabMenu: 'Daftar Transaksi Pembelian',             
        });  
});

router.get('/konfirmasipembayaran',function(req, res, next) { 
        res.render('user/pembelian/konfirmasiPembayaran', { 
          tabMenu: 'Konfirmasi Pembayaran',             
        });  
});

router.get('/konfirmasipenerimaan',function(req, res, next) { 
        res.render('user/pembelian/konfirmasiPenerimaan', { 
          tabMenu: 'Konfirmasi Penerimaan',             
        });  
});

router.get('/statuspemesanan',function(req, res, next) { 
        res.render('user/pembelian/statusPemesanan', { 
          tabMenu: 'Status Pemesanan',             
        });  
});

router.get('/keranjangbelanja/',function(req, res, next) { 
        res.render('user/pembelian/keranjangBelanja', { 
          step : 'Keranjang Belanja',             
        });  
});

router.post('/cekkeranjangbelanja',function(req, res, next) { 
    res.redirect('ringkasan');
});

router.get('/ringkasan',function(req, res, next) { 
        res.render('user/pembelian/ringkasanPembelian', { 
          step : 'ringkasan',             
        });  
});
router.post('/cekringkasan',function(req, res, next) { 
    res.redirect('konfirmasipembelian');
});

router.get('/konfirmasipembelian',function(req, res, next) { 
        res.render('user/pembelian/konfirmasipembelian', { 
          step : 'Konfirmasi',             
        });  
});

module.exports = router;
