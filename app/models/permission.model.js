const mongoose = require('mongoose')

const PermissionSchema = mongoose.Schema({
  GroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  ResourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  }}
)

module.exports = mongoose.model('Permission', PermissionSchema)
