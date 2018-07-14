const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  groupIds: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    }],
    default: []
  },
  resourceNames: {
    type: [{
      type: String
    }],
    default: []
  }

})

module.exports = mongoose.model('User', UserSchema)
