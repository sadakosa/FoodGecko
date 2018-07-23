//Cloudinary Module to Save Images
require('dotenv').config();
//load module
var cloudinary = require('cloudinary');


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
		// if (req.cookies.user_name) {
		// 	const queryString = 'SELECT * FROM items WHERE user_id = $1';
		// 	let values = [req.cookies.user_id];

		// 	db.pool.query(queryString, values, (err, result) => {
		// 		if(err) {
		// 			res.send('db error: ' + err.message);
		// 		} else {
		// 			console.log(result);
		// 			// res.render('menuNitems/items.handlebars', {result: result});
		// 			res.render('menuNitems/items.handlebars', {result: result});
		// 		}
		// 	});
			

		// } else {
		// 	res.render('home');
		// }

		// res.render('menuNitems/items');
	}

	function createItemForm (req, res) {
		res.render('menuNitems/createItemForm');
	}
	function createItem (req, res) {
		console.log('req.cookies');
		console.log(req.cookies.user_id);
		console.log('req.body');
		console.log(req.body);
		let user_id = req.cookies.user_id;
		let item_name = req.body.item_name;
		cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
			if (err) {
				res.send('db error: ' + err.message);
			} else {
				const queryString = "INSERT INTO items (user_id, item_name, item_description, item_price, item_imglink) VALUES ($1, $2, $3, $4, $5)"
				let values = [req.cookies.user_id, req.body.item_name, item]

				res.send(result);
			}
		});
	}

	return {
		getSetup,
		postSetup,
		getQrcodes,
		getAddOutlet,
		getItems,
		createItemForm,
		createItem
	}
}