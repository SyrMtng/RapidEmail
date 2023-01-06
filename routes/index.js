var express = require('express');
var router = express.Router();
var multer = require('multer');
const moment = require('moment');

const fileStorage = multer.diskStorage({
	destination: (req, file, callback) => {
	  callback(null, '././public/images');
	},
	filename: (req, file, callback) => {
	  callback(null, new Date().getTime() + '-' + file.originalname);
	}
  });

const kirim = multer({
	storage: fileStorage
})

/* GET Halaman Utama */
router.get('/', function(req, res, next) {
	res.render('home', { title: 'Send Email' });
});
router.get('/contact', function(req, res, next) {
	res.render('contact', { title: 'Send Email' });
});
router.get('/sendemail', function(req, res, next) {
	res.render('sendemail', { title: 'Send Email' });
});
router.get('/coba', function(req, res, next) {
	res.render('sendemail copy', { title: 'Send Email' });
});

	router.get('/pengeditfoto', function(req, res, next) {
		res.render('pengeditfoto', { title: 'Pengedit Foto' });
	});

router.get('/qq', function(req, res, next) {  
	Fotos.findAll()
	  	.then(foto => {
			res.render('sendemail', { 
			title: 'Send Email',
	  		});
	  	})
	  	.catch(err => {		
	  		res.render('sendemail', { 
			title: 'Send Email',
			berita: []
	  		});
	  	});
});
  
  	router.get('/tambahfoto', function(req, res, next) {
		res.render('tambahfoto', { title: 'Tambah Foto' });
	});
	router.post('/tambahfoto', kirim.array('gambar', 1), function(req, res, next) {
		// var bilangan = req.body.harga;
		// var	reverse = bilangan.toString().split('').reverse().join(''),
		// 	ribuan 	= reverse.match(/\d{1,3}/g);
		// 	ribuan	= ribuan.join('.').split('').reverse().join('');

		let gambar = req.files[0].filename;
			let foto = {
			  judul: req.body.judul,
			  deskripsi: req.body.deskripsi,
			  harga: req.body.harga,
			  gambar: gambar
		  }
		  Fotos.create(foto)
		  .then(data => {
			  res.redirect('/tokofoto');
		  })
		  .catch(err => {
			  res.render('tambahfoto', { 
			title: 'Tambah Foto'
		  	});
		  });
	});

router.get('/deletefoto/:id', function(req, res, next) {  
	var id = parseInt(req.params.id); // /detail/2, /detail/3
	Fotos.destroy({
		where: {id: id}
	})
	.then(num => {
		res.redirect('/tokofoto');
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
		});
	 });  
});

	router.get('/editfoto/:id', function(req, res, next) {  
		const id = parseInt(req.params.id);
		Fotos.findByPk(id)
		.then(foto => {
			if(foto){
				res.render('editfoto', { 
					title: 'Edit Foto',
					fotos: foto
			});
			}else{
				res.redirect('/tokofoto');
			}
			
		})
		.catch(err => {
			res.redirect('/editfoto');
		});
	
	});
	router.post('/editfoto/:id', kirim.array('gambar', 1), function(req, res, next) {  
		const id = parseInt(req.params.id);
		// var bilangan = req.body.harga;
		// var	reverse = bilangan.toString().split('').reverse().join(''),
		// 	ribuan 	= reverse.match(/\d{1,3}/g);
		// 	ribuan	= ribuan.join('.').split('').reverse().join('');

		let gambar = req.files[0].filename;
			let foto = {
			  judul: req.body.judul,
			  deskripsi: req.body.deskripsi,
			  harga: req.body.harga,
			  gambar: gambar
		  }
		Fotos.update(foto, {
			where: {id: id}
		})
		.then(num => {
			res.redirect('/tokofoto');
			
		})
		.catch(err => {
			res.json({
				info: "Error",
				message: err.message
			});
		});
	
	});
	
router.get('/transaksi', function(req, res, next) {
	Transaksis.findAll()
	  	.then(transaksi => {
			res.render('transaksi', { 
			title: 'Data Transaksi',
			transaksis: transaksi
	  		});
	  	})
	  	.catch(err => {		
	  		res.render('tokofoto', { 
			title: 'Toko Foto',
			berita: []
	  		});
	  	});
});
router.post('/transaksi', function(req, res, next) {
	res.render('sendemail', { title: 'Send Email' });
});
router.get('/deletetransaksi/:id', function(req, res, next) {  
	var id = parseInt(req.params.id); // /detail/2, /detail/3
	Transaksis.destroy({
		where: {id: id}
	})
	.then(num => {
		res.redirect('/transaksi');
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
		});
	 });  
});

router.get("/viewfoto/:id", function (req, res, next) {
	var id = req.params.id;
	// var nama = req.params.nama;
	// const komentarr = await Comment1s.findAll({ where: { idfoto: id } });
	Fotos.findByPk(id)
	  .then((foto) => {
		if (foto) {
		  res.render("viewfoto", {
			title: "View Foto",
			fotos: foto,
			// comment1s: komentarr,
		  });
		} else {
		  // http 404 not found
		  res.render("viewfoto", {
			title: "View Produk",
			foto: {},
		  });
		}
	  })
	  .catch((err) => {
		res.render("viewfoto", {
		  title: "View Foto",
		  berita: {},
		});
	  });
  });
module.exports = router;