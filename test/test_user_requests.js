let express = require('express');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let mockApp = express();
let server = require( '../app' );

mockApp.all('*', function(req, res, next) {
    req.session_user_id = '5c68ebfd2c10991ed4d1e11b';
    next();
});


chai.use(chaiHttp);


describe('Introduction',() => {
    describe('GET /', () => {
        it("Should retrieve a user for the introduction page", function (done) {
            this.timeout(0);
            let user_id = '5c68ebfd2c10991ed4d1e11b';
            chai.request(server)
                 .get('/ptest')
                 .end((err, res) => {
                        if (err) {
                             return done(err);
                        }

                         res.should.have.status(200);
                         res.body.should.be.a('object');
                         done();
                     });
        });
        it("Should be unable to get a user for the introduction page", function (done) {
            this.timeout(0);
            let user_id = '5c68ebfd2c10991ed4d1e11f';
            chai.request(server)
                .get(`/ptest/${user_id}`)
                .end((err, res) => {
                      if (err)  return done(err);

                       res.should.have.status(404);
                       done();
                   });
        });
    });
});
