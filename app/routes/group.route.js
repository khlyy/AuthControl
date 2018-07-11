module.exports = (app) => {
    const groupController = require('../controllers/group.controller.js');
    // route for creating new Group
    app.post('/resource', groupController.create);


    // route for retrieving the list of groups.
    app.get('/resource', groupController.findAll);

    // Retrieve a single group with GroupId
    app.get('/group/:id/user', notes.findOne);


}
