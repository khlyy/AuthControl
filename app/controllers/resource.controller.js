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
  Resource.find({}, 'id name')
  .then(resources => {
      let response = {count: resources.length, items: resources}
      res.send(response);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving resources."
      });
  });

};

// Find a single resource with a resourceId
exports.findOne = (req, res) => {
  Resource.findById(req.params.id)
    .then(resource => {
        if(!resource) {
            return res.status(404).send({
                message: "Resource not found with id " + req.params.id
            });
        }
        res.send(resource);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Resource not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Resource retrieving note with id " + req.params.id
        });
    });
};
