const _ = require('lodash');
const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');
const Resource = require('../models/resource.model.js');


// Create and Save a new group ***
exports.create = async (req, res) => {
  try{
  // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Group name can not be empty"
        });
    }
    // Create a Group
    const group = new Group({
        description: req.body.description || "",
        name: req.body.name
    });

    // Save group in the database
    const data = await group.save();
    res.send(data);
} catch(error){
  res.status(500).send({
      message: err.message || "Some error occurred while creating the group."
  });
}
};

// FOR USERSS
exports.createUser = async (req, res) => {
try{
    // Create a user
    const user = new User({});
    // Save user in the database
    const data = await user.save()
    res.send(data);
  } catch(error){
    res.status(500).send({
        message: err.message || "Some error occurred while creating the group."
    });
  }
};
//USERSS
exports.findAllUsers = async (req, res) => {
  try{
    const users = await User.find({}, 'groupIds resourceNames')
    let response = {count:users.length, items:users}
    res.send(response);
  } catch(error){
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
    });
  }
};


// Retrieve and return all group from the database. ***
exports.findAll = async (req, res) => {
try{
    const groups = await Group.find({}, 'id name description')
    let response = {count:groups.length, items:groups}
    res.send(response);
} catch(error){
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving groups."
    });
}
};


// Find a single group with a groupId
exports.findOne = async (req, res) => {
try{
    const group = await Group.findOne({"_id":req.params.id}, 'id name description')
    if(!group) {
        return res.status(404).send({
            message: "group not found with id " + req.params.id
        });
    }
    res.send(group);
} catch(error){
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "group not found with id " + req.params.id
        });
    }
    return res.status(500).send({
        message: "Error retrieving note with id " + req.params.id
    });
}
};

// Returns a list of users belonging to that group.
exports.getAttachedUsers = (req, res) => {
};


// attach list of users to specific group **
exports.attachUsers = async (req, res) => {
try{
  let array = req.body;
  const response = await User.updateMany({"_id": {$in: _.map(array, 'userId')}}, { $push: { "groupIds": req.params.id}
}, {new: true});

   res.status(204).send();
 }
   catch(error) {
       return res.status(500).send({
           message: "Error in updating users"
       });
   };
};

// authorize a group to access list of resources **
exports.authorizePost = async (req, res) => {
  try{
  const resources = await Resource.find({"_id": {$in: _.map(req.body, 'resourceId')}},'name');
  const response = await User.updateMany({"groupIds": req.params.id},
  {
     $push: { "resourceNames": _.map(resources, 'name')}
   }, {new: true});

   res.status(204).send();
 } catch(error){
   return res.status(500).send({
       message: "Error in updating users"
   });
 }
};

// Returns a list of resources this group can access and their total count.
exports.authorizeGet = (req, res) => {
};
