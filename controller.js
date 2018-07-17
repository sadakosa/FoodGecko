const sha256 = require('js-sha256');
const db = require('./db');

module.exports = {

	getLogin : (req, res) => {
		res.render('login');
	},

	getRegister : (req, res) => {
		res.render('register');
	},

	postRegister : (request, response)  => {
 
    	//Begin check to see if email is already taken.
    	const queryString = "SELECT * FROM users WHERE email = '" + request.body.email + "'";
    	db.pool.query(queryString, (err1, result) => {
			if (err1) console.log("postRegister Query1 error: " + err1.stack);

			if (result.rows.length === 0) {  // Means no existing result
				let pwdHash = sha256(request.body.password); // Hashes password

				// Stores into DB users
		        let params = [request.body.user_name, request.body.business_name, pwdHash, request.body.email];
		        let insertSQL = "INSERT INTO users (user_name, business_name, pwd_hash, email) VALUES ($1, $2, $3, $4)"
				
				db.pool.query(insertSQL, params, (err2, result) => { // STORE SIGNUP DATA
					if (err2) console.log("postRegister Query2 Error: "+ err2);

            		console.log(`New user signed up ${request.body.email}.`);
            		response.render('login', { message : "Thanks for signing up!"});
          		});
    		
    		} else {  //END - FRESH EMAIL
      		
      		response.render('register', {message:"E-mail is already in use."})
    		} 
    	}); // FIRST SQL QUERY
	},

	getSetup : (req, res) => {
		res.render('setup')
	},

	postSetup : (req, res) => {
		const queryString = 'INSERT INTO'
	},

	getQrcodes : (req, res) => {
		let id = req.params.id
		res.render('qrCodes');
	}
}