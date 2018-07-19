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

	function getAddOutlet (req, res) {
		if (req.cookies.user_name) {
			res.render('outlets/addOutlet', {user_name : req.cookies.user_name});
		} else {
			res.render('home');
		}
	}

	return {
		getSetup,
		postSetup,
		getQrcodes,
		getAddOutlet
	}
}