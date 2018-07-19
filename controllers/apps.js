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

	function getItems (req, res) {
		if (req.cookies.user_name) {
			const queryString = 'SELECT * FROM items WHERE user_id = $1';
			let values = [req.cookies.user_id];

			db.pool.query(queryString, values, (err, result) => {
				if(err) {
					res.send('db error: ' + err.message);
				} else {
					console.log(result);
					// res.render('menuNitems/items.handlebars', {result: result});
					res.render('menuNitems/items.handlebars', {result: result});
				}
			});
			

		} else {
			res.render('home');
		}
	}

	return {
		getSetup,
		postSetup,
		getQrcodes,
		getAddOutlet,
		getItems
	}
}