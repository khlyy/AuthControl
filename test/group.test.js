const mongoose = require("mongoose");
const Resource = require('../app/models/resource.model.js');
const Group = require('../app/models/group.model.js');
const User = require('../app/models/user.model.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
describe('Resource', () => {

    beforeEach((done) => {
        Group.remove({}, (err) => {
        User.remove({},(err) => {
        Resource.remove({},() => {
          done();
        });
      });
        });
    });
  describe('/GET group', () => {
      it('it should GET all the groups', (done) => {
            chai.request(server)
            .get('/group')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.items.should.be.a('array');
                res.body.items.length.should.be.eql(0);
                res.body.should.have.property('count').equal(0);

              done();
            });
      });
  });
  describe('/POST group', () => {
      it('it should not POST a group without name field', (done) => {
        let group = {
        }
            chai.request(server)
            .post('/group')
            .send(group)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').equal("Group name can not be empty");
                done();
            });
      });
      it('it should POST a resource ', (done) => {
        let group = {
            name: "Bus group"
        }
            chai.request(server)
            .post('/group')
            .send(group)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('name').equal(group.name);
                done();
            });
      });
  });
  describe('/GET/:id group', () => {
      it('it should GET a group by the given id', (done) => {
        let group = new Group({name:"line group"});
        group.save((err, resource) => {
            chai.request(server)
            .get('/group/' + group.id)
            .send(group)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').equal(group.name);
                res.body.should.have.property('_id').eql(group.id);
              done();
            });
        });

      });
  });

  describe('/group/:id/user', async () => {
      it('it should attach a group of users to specific group by the given id', async () => {
        let group = new Group({name:"line group"});
        let firstUser = new User({});
        let secondUser = new User({});
        group = await group.save();
        firstUser = await firstUser.save();
        secondUser = await secondUser.save();
        let body = [{"userId": firstUser.id}, {"userId" : secondUser.id}];
        chai.request(server)
        .post('/group/' + group.id+ '/user')
        .send(body)
        .end((err, res) => {
            res.should.have.status(204);
        });
      });
  });


});
