const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: String,
    groupIds: {
      type: [{
        type: mongoose.Types.ObjectId,
        ref: 'Group'
      }],
      default: []
    },
    resourceIds: {
      type: [{
        type: mongoose.Types.ObjectId,
        ref: 'Resource'
      }],
      default: []
    }

});

module.exports = mongoose.model('User', UserSchema);
