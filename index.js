// NPMS
const express = require('express');
const handlebars = require('express-handlebars');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

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

///////////////////
//    ROUTES    //
//////////////////
app.get('/login', controller.getLogin);
app.get('register', controller.getRegister);

app.get('/', (req, res) => { res.render('home') });
app.get('*', (req, res) => { res.sendStatus(404) });

// LISTEN
app.listen(3000, () => {console.log('Listen port: 3000')} );