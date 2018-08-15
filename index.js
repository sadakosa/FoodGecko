// NPMS
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');


// IMPORTS & Declarations
const main = require('./controllers/main');
const outlet = require('./controllers/outlet');
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
app.get('/login', main.getLogin);
app.post('/login', main.postLogin);
app.get('/register', main.getRegister);
app.post('/register', main.postRegister);

app.get('/setup', main.getSetup);
app.post('/setup', main.postSetup);

app.get('/outlet/:id', outlet.getQrcodes);

app.get('/logout', main.getLogout)

app.get('/', main.getRoot);
app.get('*', (req, res) => { res.sendStatus(404) });

// LISTEN
app.listen(3000, () => {console.log('Listen port: 3000')} );