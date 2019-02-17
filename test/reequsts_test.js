let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Introduction',() => {
    describe('GET /', () => {
        it("Should retrieve a user for the introduction page", (done) => {
            let user_id = 1;
            chai.request(app)
                .get(`/${user_id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("Should be unable to get a user for the introduction page", (done) => {
            let user_id = 42;
            chai.request(app)
                .get(`/${user_id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});
