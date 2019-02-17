let mongoose = require('mongoose');
let Questions = require('../models/questions');
let Users = require('../models/users');

module.exports = { 

    introduction: function (req, res, next) {
        let user = users.find(users => users.id === parseInt(req.params.user_id, 10));

        if (user) {
            return res.status(200).json({
                     user: user,
                     message: "User taking the test is available"
               });
        }

        return res.status(404).json({
            message: "Requested user not found"
        });
        
        
    },


    getNextQuestion: function (req, res, next) {
        var query = {'question': 'What did you have for dinner?'};
        res.render('Test', {'query': query} );
    },


    answerQuestion: function (req, res, next) {

        var question = 2;
        res.redirect('/next/question');
    },
}
