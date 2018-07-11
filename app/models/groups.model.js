const mongoose = require('mongoose');


const GroupSchema = mongoose.Schema({
  id: String,
);

module.exports = mongoose.model('Group', GroupSchema);
