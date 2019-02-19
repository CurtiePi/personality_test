
let chai = require('chai');
let app = require('../app');
let helper = require('../controllers/controller_helper')
let should = chai.should();


describe('Retrieve User from database',() => {
        it("Should retrieve a user from the database", async  function () {
            let user_id = '5c68ebfd2c10991ed4d1e11b';
            let user = await helper.retrieveUserById(user_id);
            should.exist(user);
        });
        it("Should retrieve all users from the database", async  function () {
            let users = await helper.retrieveAllUsers();
            should.exist(users);
            users.should.have.length(6)
        });
});
