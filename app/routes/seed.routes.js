module.exports = (app) => {
    const seedController = require('../controllers/seed.controller.js');
    // route for seeding users
   app.post('/seed/user', seedController.userSeed);

   app.post('/seed/resource', seedController.resourceSeed);


}
