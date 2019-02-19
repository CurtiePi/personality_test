
let chai = require('chai');
let app = require('../app');
let helper = require('../controllers/controller_helper')
let should = chai.should();


describe('Question interactions with database',() => {
        it("Should retrieve a from the database by id", async  function () {
            let question_id = '5c69cb3c71acae2cd75d60ab';
            let question = await helper.retrieveQuestionById(question_id);
            should.exist(question);
        });
        it("Should retrieve a from the database by order num", async  function () {
            let order_num = 2;
            let question = await helper.retrieveQuestionByOrderNum(order_num);
            should.exist(question);
        });
        it("Should retrieve a from the database by order num even if num passed as string", async  function () {
            let order_num = '3';
            let question = await helper.retrieveQuestionByOrderNum(order_num);
            should.exist(question);
        });
        it("Should not retrieve a question from database if order num is out of bounds", async  function () {
            let order_num = 100;
            let question = await helper.retrieveQuestionByOrderNum(order_num);
            should.not.exist(question);
        });
        it("Should retrieve a question count from database if there is an order nums", async  function () {
            let question = await helper.getNumberOfMainQuestions();
            question.should.equal(3);
        });
});
