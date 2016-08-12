var mongoose = require('../config/db');

var CategorySchema = mongoose.Schema({
    name: String,
    equipements:[{type: mongoose.Schema.Types.ObjectId, ref: 'Equipement'}]
});

module.exports = mongoose.model('Category', CategorySchema);