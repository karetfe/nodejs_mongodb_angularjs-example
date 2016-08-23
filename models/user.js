var mongoose = require('../config/db');

var UserSchema = mongoose.Schema({	
    nom_prenom: String,
    password: String,
	username: String,
	email: String,
    //username: { String, unique:true, required:true },
	//email: { String, unique:true, required:true },
    date_naissance: Date,
    adresse: String,
    sexe: String,
	equipements:[{type: mongoose.Schema.Types.ObjectId, ref: 'Equipement'}],
	robots:[{type: mongoose.Schema.Types.ObjectId, ref: 'Robot'}],
	
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);

	