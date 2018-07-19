const pg = require('pg');
const url = require('url');

const config = {
  user: 'master',
  host: 'devinstance.cwrecbvhyp5w.us-east-2.rds.amazonaws.com',
  database: 'foodgecko',
  password: '123gecko',
  port: 5432
};

const poolObj = new pg.Pool(config);

poolObj.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});


// const userModel = require('./models/user');
// const appleModel = require('./models/app');
// const userObj = userModel(poolObj);
// const appleObj = appleModel(poolObj);


module.exports = {
	pool : poolObj,
	// user: userObj,
	// apple: appleObj
}