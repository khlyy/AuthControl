const Resource = require('../models/resource.model.js')

// Create and Save a new resource  ***
exports.create = async (req, res) => {
  try {
  // Validate request
    if (!req.body.name) {
      return res.status(400).send({
        message: 'resource name can not be empty'
      })
    };
    // Create a Group
    const resource = new Resource({
      name: req.body.name
    })
    // Save group in the database
    const data = await resource.save()
    res.send(data)
  } catch (error) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the resource.'
    })
  }
}

// Retrieve and return all resorces from the database. ***
exports.findAll = async (req, res) => {
  try {
    const resources = await Resource.find({}, 'id name')
    let response = {count: resources.length, items: resources}
    res.send(response)
  } catch (error) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving resources.'
    })
  }
}

// Find a single resource with a resourceId
exports.findOne = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
    if (!resource) {
      return res.status(404).send({
        message: 'Resource not found with id ' + req.params.id
      })
    }
    res.send(resource)
  } catch (error) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Resource not found with id ' + req.params.id
      })
    }
    return res.status(500).send({
      message: 'Resource retrieving note with id ' + req.params.id
    })
  }
}
