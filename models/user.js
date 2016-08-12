var mongoose = require('../config/db');

var UserSchema = mongoose.Schema({
    nom_prenom: String,
<<<<<<< HEAD
    assword: String,
=======
    password: String,
>>>>>>> 9c521219d17c0651ae0bebaf0fc1b09237b5305e
    username: String,
    email: String,
    date_naissance: Date,
    adresse: String,
    sexe: String,
    
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);