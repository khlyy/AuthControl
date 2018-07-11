const mongoose = require('mongoose');


const GroupSchema = mongoose.Schema({
  id: String,
  description: String,
  resourceIds: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Resource'
    }],
    default: []
  }

);

module.exports = mongoose.model('Group', GroupSchema);
