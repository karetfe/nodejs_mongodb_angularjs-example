var config = {};
config.mongoUri = process.env.MONGOLAB_URI ||'mongodb://localhost:3000';
config.cookieMaxAge = 30 * 24 * 3600 * 1000;
config.ordrxKey = '';
config.address = {};
config.phone: '';

module.exports = app;
