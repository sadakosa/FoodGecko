module.exports = function (db) {

	function getSetup (req, res) {
		if (req.cookies.user_name) {
			let context = {
				user_name : req.cookies.user_name,
				user_id : req.cookies.user_id
			}
			res.render('outlets/setup', context);
		} else {
			res.render('home');
		}
	}

	function postSetup (req, res) {
		if (req.cookies.user_name) {
			
			let user_id = parseInt(req.body.user_id);
			let table_count = parseInt(req.body.table_count);
			let outlet_tax = parseInt(req.body.outlet_tax);

			if ( isNaN(outlet_tax) ){  // Tax by default is 0 if left blank
				outlet_tax = 0;
			}

			const queryString = 'INSERT INTO outlets (user_id, outlet_name, outlet_address, table_count, outlet_tax) VALUES ($1, $2, $3, $4, $5)';
			const values = [user_id, req.body.outlet_name, req.body.outlet_address, table_count, outlet_tax];

			db.pool.query(queryString, values, (err, result) => {
				if (err) {console.log('postSetup db err: ' + err)};

				let path = '/' + req.cookies.user_name + '/tables';
				//res.redirect(path);
				console.log(values);
				console.log(req.body);
				res.send('success');
			});
		} else {
			res.render('home');
		}
	}

	function getQRgen (req, res) {
		if (req.cookies.user_name) {

			const queryString = 'SELECT * FROM outlets WHERE user_id = ' + req.cookies.user_id;
			db.pool.query(queryString, (err, result) => {
				if (err) {console.log('getQRgen db err : ' + err)};
	
				let context = {
					table_count : result.rows[0].table_count,
					user_name : result.rows[0].user_name
				}
			res.render('outlets/QRGen', context);
			});
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
		getQRgen,
		getItems
	}
}