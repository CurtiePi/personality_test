let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
let Questions = require('../models/questions');
let Answers = require('../models/answers');
let Users = require('../models/users');

module.exports = { 
    doesPredicateMatch: function(predicate, target_value, input_value) {
        var have_match = false;
        switch (predicate) {
            case "exactEquals":
                have_match = (target_value === input_value);
                break;
            default:
                have_match = false;
        }
       return have_match;
    },

    retrieveUserById: async function(user_id) {
        try{       

            let user = await Users.getUserById(user_id);

            return user;
        } catch(err) {
            console.log("Having a problem getting a user: " + err);
        } 
    },

    retrieveAllUsers: async function() {
        try{       

            let users = await Users.find();

            return users;
        } catch(err) {
            console.log("Having a problem getting users: " + err);
        } 
    },

    retrieveQuestionById: async function(question_id) {
        try{       

            let question = await Questions.getQuestionById(question_id);

            return question;
        } catch(err) {
            console.log("Having a problem getting a question: " + err);
        } 
    },

    retrieveQuestionByOrderNum: async function(ordinal) {
        var number = parseInt(ordinal, 10);
        try{       
            let question = await Questions.getQuestionByOrdinal(number);

            return question;
        } catch(err) {
            console.log("Having a problem getting a question: " + err);
        } 
    },

    getNumberOfMainQuestions: async function() {
        try {
            let count = await Questions.countDocuments( { "order" : { $ne : null } } );
            return count;
        } catch (err) {
            console.log("Having a problem getting the questions count: " + err);
        }
    },

    insertUserAnswer: async function(user_id, question_id, user_answer) {
        uid =  mongoose.Types.ObjectId(user_id);
        qid =  mongoose.Types.ObjectId(question_id);

        try {
            let record = { "user_id": uid,
                           "question_id": qid,
                           "answer": user_answer};

            let answer = Answers(record);
            let result = await answer.save();
            return result;

        } catch (err) {

            console.log("Having a problem inserting an answer: " + err);
        }

    },

    getUserAnswers: async function (user_id) {

        try {
            let query = {"user_id": user_id};

            let answers = await Answers.find(query);
            return answers;
        } catch (err) {
            console.log("Having a problem getting a user's answers");
        }

    },

    getUserAnswerToQuestion: async function (user_id, question_id) {

        try {
            let query = {"user_id": user_id,
                         "question_id": question_id};

            let answer = await Answers.findOne(query);
            return answer;
        } catch (err) {
            console.log("Having a problem getting a user's answer");
        }

    },

    updateUserAnswer: async function(user_id, question_id, user_answer) {

        try {
            let query =  { "user_id": user_id,
                           "question_id": question_id};

            let condition = {"answer": user_answer};
            let options = {"upsert": true};

            let result = await Answers.findOneAndUpdate(query, condition, options );
            return result;

        } catch (err) {

            console.log("Having a problem inserting an answer: " + err);
        }

    },

    removeUserAnswers: async function(user_id) {

        try {
            let query =  { "user_id": user_id};

            let result = await Answers.deleteMany(query);
            return result;

        } catch (err) {

            console.log("Having a problem inserting an answer: " + err);
        }

    },

    clearAnswers: async function() {

        try {
            let query =  {};

            let result = await Answers.deleteMany(query);
            return result;

        } catch (err) {

            console.log("Having a problem inserting an answer: " + err);
        }

    },
}
