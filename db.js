const pg = require('pg');

const config = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'foodgecko',
  port: 5432
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
	pool : pool
}