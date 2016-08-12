<<<<<<< HEAD

/*MONGODB_URI = mongodb://heroku_f92qr4gs:kgqjkna91571lk6fpssdcsl7ho@ds145415.mlab.com:45415/heroku_f92qr4gs*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/roomie');
//dblocal = 'mongodb://localhost/roomie';
//mongoose.connect(process.env.MONGODB_URI , function(error){
//	if(error)
//		console.error(error);
//	else console.log('mongo connected');
//});
=======
/*MONGODB_URI = mongodb://heroku_f92qr4gs:kgqjkna91571lk6fpssdcsl7ho@ds145415.mlab.com:45415/heroku_f92qr4gs*/

var mongoose = require('mongoose');
//dblocal = 'mongodb://localhost/roomie';
mongoose.connect(process.env.MONGODB_URI , function(error){
	if(error)
		console.error(error);
	else console.log('mongo connected');
});
>>>>>>> 9c521219d17c0651ae0bebaf0fc1b09237b5305e
module.exports = mongoose;
