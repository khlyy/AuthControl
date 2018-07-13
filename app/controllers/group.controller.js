const _ = require('lodash');
const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');
const Resource = require('../models/resource.model.js');


// Create and Save a new group ***
exports.create = (req, res) => {
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
    group.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the group."
        });
    });
};

// FOR USERSS
exports.createUser = (req, res) => {
    // Create a user
    const user = new User({});

    // Save group in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the group."
        });
    });
};
//USERSS
exports.findAllUsers = (req, res) => {

    User.find({}, 'groupIds resourceIds')
    .then(users => {
      let response = {count:users.length, items:users}
      res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};


// Retrieve and return all group from the database. ***
exports.findAll = (req, res) => {

    Group.find({}, 'id name description')
    .then(groups => {
      let response = {count:groups.length, items:groups}
      res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving groups."
        });
    });
};


// Find a single group with a groupId
exports.findOne = (req, res) => {
  Group.findOne({"_id":req.params.id}, 'id name description')
      .then(group => {
          if(!group) {
              return res.status(404).send({
                  message: "group not found with id " + req.params.id
              });
          }
          res.send(group);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "group not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Error retrieving note with id " + req.params.id
          });
      });
};

// Returns a list of users belonging to that group.
exports.getAttachedUsers = (req, res) => {
};


// attach list of users to specific group **
exports.attachUsers = (req, res) => {
  let array = req.body;
  User.updateMany({"_id": {$in: _.map(array, 'userId')}
}, {
      $push: { "groupIds": req.params.id}
   }, {new: true})
   .then(response => {
       res.status(204).send();
   }).catch(err => {
       return res.status(500).send({
           message: "Error in updating users"
       });
   });
};

// authorize a group to access list of resources **
exports.authorizePost = (req, res) => {
  User.updateMany({"groupIds": req.params.id},
  {
     $push: { "resourceIds": _.map(req.body, 'resourceId')}
   }, {new: true})
   .then(response => {
       res.status(204).send();
   }).catch(err => {
       return res.status(500).send({
           message: "Error in updating users"
       });
   });
};


// Returns a list of resources this group can access and their total count.
exports.authorizeGet = (req, res) => {
};
