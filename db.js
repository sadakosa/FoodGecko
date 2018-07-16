const pg = require('pg');

const config = {
  user: 'bossgecko',
  host: 'foodgecko.cwrecbvhyp5w.us-east-2.rds.amazonaws.com',
  database: 'foodgecko',
  password: '123gecko',
  port: 5432
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
	pool : pool
}