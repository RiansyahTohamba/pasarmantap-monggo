var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/pasarmantap');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

function checkAuth(req, res, next) {
  if (!req.session.loggedin) {
    res.send('kamu tidak dapat mengakses halaman ini kembali ke <a href="/">halaman login</a>');
  } else {
    next();
  }
};


//level user, pengaturan login ada di level ini
var User = require('./routes/user');
app.use('/',User); 

var Produk = require('./routes/produk');
app.use('/produk',Produk); 

var Toko = require('./routes/toko');
app.use('/toko',Toko); 

var Pembelian = require('./routes/pembelian');
app.use('/pembelian',Pembelian); 

var Penjualan = require('./routes/penjualan');
app.use('/penjualan',Penjualan); 
//level pelanggan
var pelanggan = require('./routes/pelanggan');
// app.use('/pelanggan',checkAuth, pelanggan); yang normal
app.use('/pelanggan', pelanggan);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);  
});



// error handlers

/* development error handler will print stacktrace*/
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/* production error handler no stacktraces leaked to user*/
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
