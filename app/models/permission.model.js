const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
  GroupId: {
     type: mongoose.Types.ObjectId,
     ref: 'Group'
   },
   ResourceId: {
   type: mongoose.Types.ObjectId,
   ref: 'Resource'
 }
  );

module.exports = mongoose.model('Permission', PermissionSchema);
