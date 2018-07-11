const mongoose = require('mongoose');

const ResourceSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Resource', ResourceSchema);
