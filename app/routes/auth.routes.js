module.exports = (app) => {
    const authController = require('../controllers/auth.controller.js');
    // route for checking if the user can accsess specific resource
    
    app.get('/authorized?userId=&resourceName=', authController.isAuthorized);

}
