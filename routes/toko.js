var express = require('express');
var router = express.Router();
var Morder = require('../models/order.js');
var Order = require('mongoose').model('Order');

/* retrieve pelanggan */
router.get('/pengaturan',function(req, res, next) { 
        res.render('user/toko/pengaturanToko', { 
          title: 'ecommerce Barokah | Membantu jualan-mu',             
        });  
});

router.get('/caritoko',function(req, res, next) { 
        res.render('user/toko/cariToko', { 
          title: 'ecommerce Barokah | Membantu jualan-mu',             
        });  
});

module.exports = router;
