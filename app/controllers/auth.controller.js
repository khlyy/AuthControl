const _ = require('lodash');
const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');
const Resource = require('../models/resource.model.js');

// check if user is Authorized or not  ***
exports.isAuthorized = async (req, res) => {
  try{
  const user = await User.findOne({"_id":req.query.userId, "resourceNames": req.query.resourceName});
  if(!user) {
      return res.status(403).send({
          authorized: false
      });
  }
  let response = {authorized: true}
  res.send(response);
}catch(error){
  return res.status(500).send(err);
}
};
