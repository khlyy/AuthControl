const mongoose = require('mongoose');
const NoteSchema = mongoose.Schema({
  GroupId: {
     type: mongoose.Types.ObjectId,
     ref: 'Group'
   },
   ResourceId: {
   type: mongoose.Types.ObjectId,
   ref: 'Resource'
 }
  );

module.exports = mongoose.model('Note', NoteSchema);
