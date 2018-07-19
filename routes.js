module.exports = (app, db) => {
	const users = require('./controllers/users.js')(db);
	const apps = require('./controllers/apps.js')(db);

	//USER AUTHENTICATION
	app.get('/login', users.getLogin);
	app.post('/login', users.postLogin);
	app.get('/register', users.getRegister);
	app.post('/register', users.postRegister);
	app.get('/logout', users.getLogout)


	//SETUP OF RESTAURANT
	app.get('/setup', apps.getSetup);
	app.post('/setup', apps.postSetup);
	// app.get('/setup', controller.setup);
	app.get('/outlet/:id', apps.getQrcodes);


	//SETUP OF MENU
	app.get('/getItems', app.getItems)
	app.post('/createItems', app.createItems)
	app.post('/createItems', app.createItems)
	app.get('/createMenu', app.createMenu)

	app.get('/', users.getRoot);
	app.get('*', (req, res) => { res.sendStatus(404) });	
}
