let mongoose = require('mongoose');
let Questions = require('../models/questions');
let Answers = require('../models/answers');
let Users = require('../models/users');
let helper = require('./controller_helper');

module.exports = { 
    identification: async function (req, res, next) {
        try {
            let users = await helper.retrieveAllUsers();

            if (users) {
                return res.render('index', { users: users});
            }

            return res.status(404).json({
                message: "User list not found"
            });

        } catch (err) {
           return res.status(500).json({
               message: "Something has gone terribly wrong in the identification function!" + err
           });
        }
    },

    register: async function (req, res, next) {
        req.session.user_id = req.body.user_id;

        res.redirect('/ptest');
    },

    introduction: async function (req, res, next) {
       
        try {

            let user = await helper.retrieveUserById(req.session.user_id);
            let test_count = await helper.getNumberOfMainQuestions();

            if (user) {
                req.session.test_count = test_count;
                return res.render('intro_page',
                                 {
                                   user: user,
                                   message: "User taking the test is available"
                                 });
            }

            return res.status(404).json({
                message: "Requested user not found"
            });
       } catch (err) {
           return res.status(500).json({
               message: "Something has gone terribly wrong in the introduction function!" + err
           });
       }
   
    },


    getNextQuestion: async function (req, res, next) {
       
        try {
            let question = await helper.retrieveQuestionByOrderNum(req.params.ordinal);

            let answer = await helper.getUserAnswerToQuestion(req.session.user_id,
                                                              question.id);

            if (question) {
                return res.render('question_page',
                                 {
                                   question: question,
                                   answer: answer,
                                   message: "Next question in the test is available"
                                 });
            }

            return res.status(404).json({
                message: "Requested question not found"
            });

       } catch (err) {
           return res.status(500).json({
               message: "Something has gone terribly wrong in the getNextQuestion function!" + err
           });
       }
   
    },

    answerQuestion: async function (req, res, next) {
        // Save the answer
        if (req.body.answer) {
            var answer_id = await helper.updateUserAnswer(req.session.user_id, req.body.question_id, req.body.answer);    

            if (req.body.follow_up_id) {
                if (helper.doesPredicateMatch(req.body.predicate,
                                              req.body.target_value.trim(),
                                              req.body.answer.trim())) {

                  link = '/followup';
                  return res.redirect(307, link);
                }
            }

        }
        var next_num = 1 + parseInt(req.body.order, 10);
        var link = '/next/' + next_num;

        if (next_num > req.session.test_count) {
            link = '/finished';
        }

        res.redirect(link);
    },

    getFollowUpQuestion: async function (req, res, next) {
        try {
            let question = await Questions.getQuestionById(req.body.follow_up_id);

            let answer = await helper.getUserAnswerToQuestion(req.session.user_id,
                                                                     question.id);
                if (question) {
                    question.order = req.body.order;
                    return res.render('question_page',
                                 {
                                   question: question,
                                   answer, answer,
                                   message: "Next question in the test is available"
                                 });
                }
                return res.status(404).json({
                    message: "User list not found"
                });

        } catch (err) {
            return res.status(500).json({
                message: "Something has gone terribly wrong in the getFollowUpQuestion function!" + err
            });
        }
    },

    exitTest: async function(req, res, next) {
        try {
            let user = await helper.retrieveUserById(req.session.user_id);

            if (user) {
                return res.render('goodbye', { user: user });
            }
            return res.status(404).json({
                message: "User list not found"
            });
       } catch (err) {
           return res.status(500).json({
               message: "Something has gone terribly wrong in the exitTest function!" + err
           });
       }
    }
}
