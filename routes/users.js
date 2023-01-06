var express = require('express');
var multer = require('multer');
var router = express.Router();

const db = require('../models');
const Berita = db.berita;
const Komen1 = db.komen1s;
const Op = db.Sequelize.Op;

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
  });
  
  router.get('/berita', function(req, res, next) {  
	Berita.findAll()
	  .then(berita => {
		res.render('berita', { 
		title: 'Daftar Berita',
		berita: berita
	  });
	  })
	  .catch(err => {		
	  res.render('berita', { 
		title: 'Daftar Berita',
		berita: []
	  });
	  });
  
  });

  router.get('/tambahberita', function(req, res, next) {
	res.render('tambahberita', { title: 'Tambah Berita' });
  });
  router.post('/tambahberita', function(req, res, next) {
	  var berita = {
		  judul: req.body.judul,
		  deskripsi: req.body.deskripsi,
		  isi: req.body.isi,
		  gambar: req.body.gambar
	  }
	  Berita.create(berita)
	  .then(data => {
		  res.redirect('/berita');
	  })
	  .catch(err => {
		  res.render('tambahberita', { 
		title: 'Tambah Berita'
	  });
	  });
  });
  

router.get("/berhasil", function(req, res, next){
	response.render('tambahberita', {title:'Mendaftar Berita'});
});

router.post("/berhasil", function(request, response, next){
	var storage = multer.diskStorage({
		destination:function(request, file, callback)
		{
			callback(null, './upload');
		},
		filename : function(request, file, callback)
		{
			var temp_file_arr = file.originalname.split(".");
			var temp_file_name = temp_file_arr[0];
			var temp_file_extension = temp_file_arr[1];
			callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
		}
	});
	var upload = multer({storage:storage}).single('gambar');
	upload(request, response, function(error){
		if(error)
		{
			return response.end('Error Uploading File');
		}
		else
		{
			response.redirect("/tambahberita");
		}
	});
});

router.get('/baca/:id', function(req, res, next) {  
	var id = parseInt(req.params.id); 
	Berita.findByPk(id)
	  .then(baca => {
		  if(baca){
			  res.render('baca', { 
		  title: 'Baca Berita',
		  berita: baca
		});
		  }else{
			  // http 404 not found
			  res.render('baca', { 
		  title: 'Baca Produk',
		  berita: {}
		});
		  }
		  
	  })
	  .catch(err => {
		  res.render('baca', { 
		title: 'Baca Berita',
		berita: {}
	  });
	  });
  
  });
  
  
  router.get('/deleteproduct/:id', function(req, res, next) {  
	var id = parseInt(req.params.id); // /detail/2, /detail/3
  
	Berita.destroy({
		  where: {id: id}
	  })
	  .then(num => {
	  res.redirect('/berita');
	  })
	  .catch(err => {
		  res.json({
			  info: "Error",
			  message: err.message
		  });
	  });  
  
  });
  
  router.get('/editberita/:id', function(req, res, next) {  
	var id = parseInt(req.params.id); // /detail/2, /detail/3
	// query ke database
	// select * from product where id=id
	Berita.findByPk(id)
	  .then(detailBerita => {
		  if(detailBerita){
			  res.render('editberita', { 
		  title: 'Edit Berita',
		  id: detailBerita.id,
		  name: detailBerita.name,
		  quantity: detailBerita.quantity,
		  price: detailBerita.price
		});
		  }else{
			  // http 404 not found
			  res.redirect('/product');
		  }
		  
	  })
	  .catch(err => {
		  res.redirect('/product');
	  });
  
  });
  router.post('/editberita/:id', function(req, res, next) {  
	var id = parseInt(req.params.id); // /detail/2, /detail/3
  
	Product.update(req.body, {
		  where: {id: id}
	  })
	  .then(num => {
		  res.redirect('/berita');
		  
	  })
	  .catch(err => {
		  res.json({
			  info: "Error",
			  message: err.message
		  });
	  });
  
  });
module.exports = router;