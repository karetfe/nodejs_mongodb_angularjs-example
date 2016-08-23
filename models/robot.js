var mongoose = require('../config/db');

var RobotSchema = mongoose.Schema({
    reference: String,
    nom: String,
	flag: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Robot', RobotSchema);