module.exports = (app) => {
    const resourceController = require('../controllers/resource.controller.js');
    // route for creating new resource
    app.post('/resource', resourceController.create);

    // route for retrieving the list of resources.
    app.get('/resource', resourceController.findAll);

    // Retrieve a single resource with resourceId
    app.get('/resource/:id', resourceController.findOne);


}
