const dotenv = require( "dotenv");

dotenv.config({
  path: ".env",
});


exports.PORT = process.env.PORT || 3000;

exports.SECRET_KEY = process.env.SECRET_KEY;
exports.API_PREFIX = process.env.API_PREFIX ;
