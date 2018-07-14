const Resource = require('../app/models/resource.model.js')
const Group = require('../app/models/group.model.js')
const User = require('../app/models/user.model.js')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)
describe('Group', () => {
  beforeEach((done) => {
    Group.remove({}, (err) => {
      User.remove({}, (err) => {
        Resource.remove({}, () => {
          done()
        })
      })
    })
  })
  describe('/GET group', () => {
    it('it should GET all the groups', (done) => {
      chai.request(server)
        .get('/group')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.items.should.be.a('array')
          res.body.items.length.should.be.eql(0)
          res.body.should.have.property('count').equal(0)

          done()
        })
    })
  })
  describe('/POST group', () => {
    it('it should not POST a group without name field', (done) => {
      let group = {
      }
      chai.request(server)
        .post('/group')
        .send(group)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('message').equal('Group name can not be empty')
          done()
        })
    })
    it('it should POST a resource ', (done) => {
      let group = {
        name: 'Bus group'
      }
      chai.request(server)
        .post('/group')
        .send(group)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name')
          res.body.should.have.property('name').equal(group.name)
          done()
        })
    })
  })
  describe('/GET/:id group', () => {
    it('it should GET a group by the given id', (done) => {
      let group = new Group({name: 'line group'})
      group.save((err, resource) => {
        chai.request(server)
          .get('/group/' + group.id)
          .send(group)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('name').equal(group.name)
            res.body.should.have.property('_id').equal(group.id)
            done()
          })
      })
    })
  })

  describe('/group/:id/user', async () => {
    it('it should attach a group of users to specific group by the given id', async () => {
      let group = new Group({name: 'line group'})
      let firstUser = new User({})
      let secondUser = new User({})
      group = await group.save()
      firstUser = await firstUser.save()
      secondUser = await secondUser.save()
      let body = [{'userId': firstUser.id}, {'userId': secondUser.id}]
      chai.request(server)
        .post('/group/' + group.id + '/user')
        .send(body)
        .end((err, res) => {
          res.should.have.status(204)
        })
    })
  })

  describe('/group/:id/authorize', async () => {
    it('it should authorize a group to access group by resources', async () => {
      let group = await new Group({name: 'line group'}).save()
      let firstResource = await new Resource({'name': 'Bus'}).save()
      let secondResource = await new Resource({'name': 'Line'}).save()
      let firstUser = await new User({'groupIds': [group.id]}).save()
      let secondUser = await new User({'groupIds': [group.id]}).save()

      let body = [{'resourceId': firstResource.id}, {'resourceId': secondResource.id}]
      chai.request(server)
        .post('/group/' + group.id + '/authorize')
        .send(body)
        .end((err, res) => {
          res.should.have.status(204)
        })
    })
  })

  describe('/authorized?user=id&resourceName=name', async () => {
    it('it should check if a user can access a resource or not', async () => {
      let group = await new Group({name: 'line group'}).save()
      let firstResource = await new Resource({'name': 'Bus'}).save()
      let firstUser = await new User({'groupIds': [group.id], 'resourceNames': ['Bus']}).save()
      chai.request(server)
        .get('/authorized?userId=' + firstUser.id + 'resourceName=' + firstResource.name)
        .send()
        .end((err, res) => {
          res.should.have.property('authorized').equal(true)
        })
    })
  })
})
