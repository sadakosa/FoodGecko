// NPMS
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');


// IMPORTS & Declarations
const controller = require('./controller');
const db = require('./db');
const app = express();


// Set Handlebars to be the default view engine
const handlebarsConfig = {
   extname: '.handlebars',
   layoutsDir: 'views',
   defaultLayout: 'layout'
};

app.engine('handlebars', handlebars.create(handlebarsConfig).engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Set public folder & middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//////////////////
//    ROUTES    //
//////////////////
app.get('/login', controller.getLogin);
app.post('/login', controller.postLogin);
app.get('/register', controller.getRegister);
app.post('/register', controller.postRegister);

app.get('/setup', controller.getSetup);
app.get('/outlet/:id', controller.getQrcodes);

app.get('/logout', controller.getLogout)


app.get('/', controller.getRoot);
app.get('*', (req, res) => { res.sendStatus(404) });

// LISTEN
app.listen(3000, () => {console.log('Listen port: 3000')} );