var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;

var Users = require('./users');
var Questions = require('./questions');

var AnswersSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Users
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Questions
  },
  answer : {
    type: String,
    trim: true
  }
});

AnswersSchema.options.toObject = {
  virturals: true,
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
};

AnswersSchema.index({ user_id: 1, question_id: 1 }, { unique: true });

var Answers = mongoose.model('Answers', AnswersSchema);
module.exports = Answers;
