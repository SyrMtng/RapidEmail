module.exports = (sequelize, Sequelize) => {
	const Foto = sequelize.define("foto", {
		gambar: {
			type: Sequelize.STRING
		}	,	
        judul: {
			type: Sequelize.STRING
		},
		deskripsi: {
			type: Sequelize.TEXT
		},
		harga: {
			type: Sequelize.FLOAT
		}
			
	});
	return Foto;
};