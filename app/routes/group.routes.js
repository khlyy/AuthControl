module.exports = (app) => {
    const groupController = require('../controllers/group.controller.js');
    // route for creating new Group
    app.post('/group', groupController.create);


    // route for retrieving the list of groups.
    app.get('/group', groupController.findAll);

    // Retrieve a single group with GroupId
    app.get('/group/:id', groupController.findOne);

    // attach a list of users belonging to one group
    app.get('/group/:id/user', groupController.getAttachedUsers);

    //Attaches list of userId s to the group.
    app.post('/group/:id/user', groupController.attachUsers);

    // Authorizes the group to access any of the resources listed.
    app.post('/group/:id/authorize', groupController.authorizePost);


    // Returns a list of resources this group can access and their total count.
    app.get('/group/:id/authorize', groupController.authorizeGet);

}
