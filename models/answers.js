var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;

var Users = require('./users');
var Questions = require('./questions');

var AnswersSchema = new Schema({
  user_id: {
    type: mongoose.Schema,Types.ObjectId,
    ref: Users,
    set: function(data) {
      if (typeof myVar === 'string' || myVar instanceof String) {
        return new ObjectId(data);
      } else {
        return data;
    }
  },
  questions_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Questions,
    set: function(data) {
      if (typeof myVar === 'string' || myVar instanceof String) {
        return new ObjectId(data);
      } else {
        return data;
    }
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

var Answers = mongoose.model('Answers', AnswersSchema);
module.exports = Answers;
