const mongoose = require('mongoose');

const ResourceSchema = mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('Resource', ResourceSchema);
