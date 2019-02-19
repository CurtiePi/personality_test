
let chai = require('chai');
let app = require('../app');
let helper = require('../controllers/controller_helper')
let should = chai.should();

before( async function() {
    await helper.clearAnswers();
    
});

describe('Answer interactions with database',() => {
        it("Should insert an answer into the database", async  function () {
            let user_id = "5c68ebfd2c10991ed4d1e11c";
            let question_id = "5c69cb3c71acae2cd75d60ab";
            let user_answer = "very important";
            let result = await helper.insertUserAnswer(user_id, question_id, user_answer);
            should.exist(result);
        });
        it("Should update an answer in the database", async  function () {
            let user_id = "5c68ebfd2c10991ed4d1e11c";
            let question_id = "5c69cb3c71acae2cd75d60ad";
            let user_answer = "important";
            let result = await helper.updateUserAnswer(user_id, question_id, user_answer);
            should.exist(result);
        });
        it("Should get a user's answer to one question from the database", async  function () {
            let user_id = "5c68ebfd2c10991ed4d1e11c";
            let question_id = "5c69cb3c71acae2cd75d60ab";
            let answers = await helper.getUserAnswerToQuestion(user_id, question_id);
            answers.should.have.length(1);
        });
});
