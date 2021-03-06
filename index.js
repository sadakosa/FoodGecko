// NPMS
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');


// IMPORTS & Declarations
const db = require('./db');
const app = express();



//Cloudinary Module to Save Images
require('dotenv').config();
//load module
var cloudinary = require('cloudinary');

//post route
// app.post('/', upload.single('myFile'), function(req, res) {
//   cloudinary.uploader.upload(req.file.path, function(result) {
//     res.send(result);
//   });
// });



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
require('./routes.js')(app, db);

// LISTEN
app.listen(3000, () => {console.log('Listen port: 3000')} );