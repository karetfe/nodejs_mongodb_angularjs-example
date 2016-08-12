var mongoose = require('../config/db');

var UserSchema = mongoose.Schema({
    nom_prenom: String,
    password: String,
    username: String,
    email: String,
    date_naissance: Date,
    adresse: String,
    sexe: String,
    
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);