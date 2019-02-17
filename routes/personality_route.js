var express = require('express');
var personalityController = require('../controllers/personality_controller')

var personalityRouter = express.Router();
module.exports = personalityRouter;


personalityRouter.get('/:user_id', personalityController.introduction);
personalityRouter.get('/next/:question', personalityController.getNextQuestion);
personalityRouter.post('/answer', personalityController.answerQuestion);
