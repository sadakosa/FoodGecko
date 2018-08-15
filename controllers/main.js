const sha256 = require('js-sha256');
const db = require('../db');

module.exports = {

	getRoot : (req, res) => {
		if (req.cookies.user_name) {
			res.render('dashboard', {user_name : req.cookies.user_name});
		} else {
			res.render('home');
		}
	},

	getLogout : (req, res) => {         // Redirects to root
		res.clearCookie('email');
		res.clearCookie('loggedin');
		res.clearCookie('user_name');
		res.redirect('/');
	},

	getLogin : (req, res) => {
		res.render('login');
	},

	getRegister : (req, res) => {
		res.render('register');
	},

	postRegister : (req, res)  => {
    	//Begin check to see if email is already taken.
    	const queryString = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
    	db.pool.query(queryString, (err1, result) => {
			if (err1) console.log("postRegister Query1 error: " + err1.stack);

			if (result.rows.length === 0) {  // Means no existing result
				let pwdHash = sha256(req.body.password); // Hashes password

				// Stores into DB users
		        let params = [req.body.user_name, req.body.business_name, pwdHash, req.body.email];
		        let insertSQL = "INSERT INTO users (user_name, business_name, pwd_hash, email) VALUES ($1, $2, $3, $4)"
				
				db.pool.query(insertSQL, params, (err2, result) => { // STORE SIGNUP DATA
					if (err2) console.log("postRegister Query2 Error: "+ err2.stack);

            		console.log(`New user signed up ${req.body.email}.`);
            		res.render('login', { message : "Thanks for signing up!"});
          		});
    		
    		} else {  //END - FRESH EMAIL
      		
      			res.render('register', {message:"E-mail is already in use."})
    		} 
    	}); // FIRST SQL QUERY
	},

	getSetup : (req, res) => {
		const queryString = "SELECT * FROM users WHERE email = '" + req.cookies.email + "'";
		db.pool.query(queryString, (err, result) => {
			res.render('setup', {user_id : result.rows[0].id} );
		});
	},

	postSetup : (req, res) => {
		console.log(req.body);
		res.redirect('/');
	},

	postLogin : (req, res) => {
		const queryString = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
		db.pool.query(queryString, (err, result) => {
        	if (err) console.log(err);
        	
        	if (result.rows.length === 0){
        		
        		res.render('login', { message : "E-mail address doesn't exist."} );
        		
        	} else {

				if (result.rows[0].pwd_hash === sha256(req.body.password) ) {
		            res.cookie('loggedin', true);
		            res.cookie('email', result.rows[0].email);
		            res.cookie('user_name', result.rows[0].user_name);
		            res.redirect('/'); //Pass - Cookie! - Redirect.
				} else {
            		res.render('login', { message : "Wrong password, please try again."} );
            		//Fail - Wrong pass
        		}
        	}
	    });
	}
}