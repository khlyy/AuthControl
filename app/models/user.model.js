const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    groupIds: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
      }],
      default: []
    },
    resourceIds: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
      }],
      default: []
    }

});

module.exports = mongoose.model('User', UserSchema);
