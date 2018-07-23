let multer = require('./multerConfig.js').multer;
let multerConfig = require('./multerConfig.js').multerConfig;

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
	app.get('/:userName/tables', apps.getQRgen);
	
	//SETUP OF MENU

	//app.get('/outlet/new', apps.getAddOutlet);
	//app.get('/outlet/:id', apps.getQrcodes);


	//SETUP OF MENU

	app.get('/getItems', apps.getItems);
	app.get('/createItem', apps.createItemForm);
	app.post('/createItem', multer(multerConfig).single('photo'), apps.createItem);
	// app.post('/createItems', apps.createItems)
	// app.get('/createMenu', apps.createMenu)
	// app.post('/createMenu', multer(multerConfig).single('photo'), apps.createMenu);

	app.get('/', users.getRoot);
	app.get('*', (req, res) => { res.sendStatus(404) });	
}
