var mongoose = require('../config/db');

var RappelSchema = mongoose.Schema({
    titre: String,
    date_rappel: String,
    heure_rappel: String,
    type: String,
    modif: { type: Number, default: 0 },
    suppre: String,
    robot: { type: mongoose.Schema.Types.ObjectId, ref: 'Robot' }
});

module.exports = mongoose.model('Rappel', RappelSchema);