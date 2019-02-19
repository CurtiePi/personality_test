
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

let server = require( '../app' );

describe('Question Retrieval through request',() => {
    describe('GET /', () => {
        it("Should retrieve a question for by order num", function (done) {
            this.timeout(0);
            let ordinal = 2;
             chai.request(server)
                 .get(`/next/${ordinal}`)
                 .end((err, res) => {
                         if (err) {
                              console.log(err);
                              return done(err);
                         }
                       
                       res.should.have.status(200);
                       res.body.should.be.a('object');
                       done();
                   });
        });
        it("Should not be able to get a find a question", function (done) {
            this.timeout(0);
            let ordinal = 0;
            chai.request(server)
                .get(`/next/${ordinal}`)
                .end((err, res) => {
                      if (err)  return done(err);

                       res.should.have.status(404);
                       done();
                   });
        });
    });
});
