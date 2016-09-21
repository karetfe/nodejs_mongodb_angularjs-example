var mongoose = require('../config/db');

var RobotSchema = mongoose.Schema({
    reference: "sdsf54d545dkojifd65fdvFFfdgkqo646546covbcvqsdvld5644sxFF5454vfdFFRfsds545fsdccvc6564sdjksdjkf5465d6bsdhsjhdsff4545454njfflfkoggGLfsdmlfodjfodFSDf",
    nom: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rappels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rappel'}]

});

module.exports = mongoose.model('Robot', RobotSchema);