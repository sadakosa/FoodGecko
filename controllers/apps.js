module.exports = function (db) {
	function getSetup (req, res) {
		res.render('setup')
	}

	function postSetup (req, res) {
		// const queryString = 'INSERT INTO'
	}

	function getQrcodes (req, res) {
		let id = req.params.id;
		res.render('qrCodes');
	}

	return {
		getSetup: getSetup,
		postSetup: postSetup,
		getQrcodes: getQrcodes
	}
}