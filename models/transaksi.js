module.exports = (sequelize, Sequelize) => {
	const Transaksi = sequelize.define("transaksi", {
		idpesanan: {
			type: Sequelize.STRING
		}	,	
        gambar: {
			type: Sequelize.STRING
		},
		judul: {
			type: Sequelize.STRING
		},
		harga: {
			type: Sequelize.FLOAT
		},
        status: {
			type: Sequelize.STRING
		}
			
	});
	return Transaksi;
};