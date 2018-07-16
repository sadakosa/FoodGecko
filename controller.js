const db = require('./db');

module.exports = {

	getLogin : (req, res) => {
		res.render('login');
	},

	getRegister : (req, res) => {
		res.render('register');
	}
}