const mongoose = require('mongoose');


const GroupSchema = mongoose.Schema({
  id: String,
  userIds: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }],
    default: []
  }
);

module.exports = mongoose.model('Group', GroupSchema);
