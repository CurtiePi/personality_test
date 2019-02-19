var express = require('express');
var personalityController = require('../controllers/personality_controller')

var personalityRouter = express.Router();
module.exports = personalityRouter;


personalityRouter.get('/ptest', personalityController.introduction);
personalityRouter.get('/next/:ordinal', personalityController.getNextQuestion);
personalityRouter.post('/answer', personalityController.answerQuestion);
personalityRouter.get('/', personalityController.identification);
personalityRouter.post('/', personalityController.register);
personalityRouter.post('/followup', personalityController.getFollowUpQuestion);
personalityRouter.get('/finished', personalityController.exitTest);
