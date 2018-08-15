const db = require('../db');

module.exports = {
	getQrcodes : (req, res) => {
		let id = req.params.id
		res.render('qrCodes');
	}
}