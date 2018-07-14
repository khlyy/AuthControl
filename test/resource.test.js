let mongoose = require("mongoose");
const Resource = require('../app/models/resource.model.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Resource', () => {
    beforeEach((done) => {
        Resource.remove({}, (err) => {
           done();
        });
    });
  describe('/GET resource', () => {
      it('it should GET all the resources', (done) => {
            chai.request(server)
            .get('/resource')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.items.should.be.a('array');
                res.body.items.length.should.be.eql(0);
                res.body.should.have.property('count').equal(0);

              done();
            });
      });
  });
  describe('/POST resource', () => {
      // it('it should not POST a book without pages field', (done) => {
      //   let book = {
      //       title: "The Lord of the Rings",
      //       author: "J.R.R. Tolkien",
      //       year: 1954
      //   }
      //       chai.request(server)
      //       .post('/book')
      //       .send(book)
      //       .end((err, res) => {
      //           res.should.have.status(200);
      //           res.body.should.be.a('object');
      //           res.body.should.have.property('errors');
      //           res.body.errors.should.have.property('pages');
      //           res.body.errors.pages.should.have.property('kind').eql('required');
      //         done();
      //       });
      // });
      it('it should POST a resource ', (done) => {
        let resource = {
            name: "Buss"
        }
            chai.request(server)
            .post('/resource')
            .send(resource)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('name').equal(resource.name);
                done();
            });
      });
  });
  describe('/GET/:id resource', () => {
      it('it should GET a resource by the given id', (done) => {
        let resource = new Resource({name:"LINE"});
        resource.save((err, resource) => {
            chai.request(server)
            .get('/resource/' + resource.id)
            .send(resource)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').equal(resource.name);
                res.body.should.have.property('_id').eql(resource.id);
              done();
            });
        });

      });
  });

});
