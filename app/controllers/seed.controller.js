const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');
const Resource = require('../models/resource.model.js');

exports.userSeed = async (req, res) => {
try {
  let remove = await User.remove({});
  let array = [];
  for(let i = 0; i < 100000; i++){
  let user = new User({});
  array.push(user)
}
  let insert = await User.insertMany(array)
  res.status(200).send()
}catch(error){
  res.send(error)

}
}


exports.resourceSeed = async (req, res) => {
  try{
  let remove = await Resource.remove({});
  let bus = new Resource({name:"bus"})
  let line = new Resource({name:"line"})
  let booking = new Resource({name:"booking"})
  let trip = new Resource({name:"trip"})
  let bike = new Resource({name:"bike"})
  let motor = new Resource({name:"motor"})
  let train = new Resource({name:"train"})

  let busSave = await bus.save()
  let lineSave = await line.save()
  let bookingSave = await booking.save()
  let tripSave = await trip.save()
  let bikeSave = await bike.save()
  let motorSave = await motor.save()
  let trainSave = await train.save()
  res.status(200).send()
}catch(error){
  res.send(error)

}
}
