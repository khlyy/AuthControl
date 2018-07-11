const Resource = require('../models/resource.model.js');

// Create and Save a new resource  ***
exports.create = (req, res) => {
  // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "resource name can not be empty"
        });
    }

    // Create a Group
    const resource = new Resource({
        name: req.body.name
    });

    // Save group in the database
    resource.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the resource."
        });
    });
};

// Retrieve and return all resorces from the database. ***
exports.findAll = (req, res) => {

};

// Find a single resource with a resourceId
exports.findOne = (req, res) => {

};
