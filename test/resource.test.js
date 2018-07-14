const mongoose = require('mongoose')
const Resource = require('../app/models/resource.model.js')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)
describe('Resource', () => {
  beforeEach((done) => {
    Resource.remove({}, (err) => {
      done()
    })
  })
  describe('/GET resource', () => {
    it('it should GET all the resources', (done) => {
      chai.request(server)
        .get('/resource')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.items.should.be.a('array')
          res.body.items.length.should.be.eql(0)
          res.body.should.have.property('count').equal(0)

          done()
        })
    })
  })
  describe('/POST resource', () => {
    it('it should not POST a resource without name field', (done) => {
      let resource = {
      }
      chai.request(server)
        .post('/resource')
        .send(resource)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('message').equal('resource name can not be empty')
          done()
        })
    })
    it('it should POST a resource ', (done) => {
      let resource = {
        name: 'Buss'
      }
      chai.request(server)
        .post('/resource')
        .send(resource)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name')
          res.body.should.have.property('name').equal(resource.name)
          done()
        })
    })
  })
  describe('/GET/:id resource', () => {
    it('it should GET a resource by the given id', (done) => {
      let resource = new Resource({name: 'LINE'})
      resource.save((err, resource) => {
        chai.request(server)
          .get('/resource/' + resource.id)
          .send(resource)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('name').equal(resource.name)
            res.body.should.have.property('_id').eql(resource.id)
            done()
          })
      })
    })
  })
})
