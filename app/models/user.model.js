const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: String,
});

module.exports = mongoose.model('User', UserSchema);
