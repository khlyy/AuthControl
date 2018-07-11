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

// Retrieve and return all group from the database. ***
exports.findAll = (req, res) => {

};

// Find a single group with a groupId
exports.findOne = (req, res) => {

};

// attach list of users to specific group **
exports.attachUsers = (req, res) => {

};

// authorize a group to access list of resources **
exports.authorizePost = (req, res) => {
};


// Returns a list of resources this group can access and their total count.
exports.authorizeGet = (req, res) => {
};
