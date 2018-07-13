const _ = require('lodash');
const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');
const Resource = require('../models/resource.model.js');

// check if user is Authorized or not  ***
exports.isAuthorized = (req, res) => {
  User.findOne({"_id":req.query.userId, "resourceIds": req.query.resourceName})
      .then(user => {
          if(!user) {
              return res.status(403).send({
                  authorized: false
              });
          }
          let response = {authorized: true}
          res.send(response);
      }).catch(err => {
          return res.status(500).send(err);
      });
};
