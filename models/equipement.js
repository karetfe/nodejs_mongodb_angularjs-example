var mongoose = require('../config/db');

var EquipementSchema = mongoose.Schema({
    libelle: String,
    marque: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	
});

module.exports = mongoose.model('Equipement', EquipementSchema);