module.exports = (app) => {
    const resourceController = require('../controllers/resource.controller.js');
    // route for creating new resource
    app.post('/resource', resourceController.create);

}
