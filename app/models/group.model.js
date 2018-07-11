const mongoose = require('mongoose');


const GroupSchema = mongoose.Schema({
  description: String,
  resourceIds: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    }],
    default: []
  }}
);

module.exports = mongoose.model('Group', GroupSchema);
