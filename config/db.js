var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/roomie');
module.exports = mongoose;
