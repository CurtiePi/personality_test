var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;


var QuestionsSchema = new Schema({
  order: {
    type: Number
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  question_type: {
    type: String,
    required: true,
    trim: true,
    get: function(data) {
      try {
        return JSON.parse(data);
      } catch(err) {
        return data;
      }
    },
    set: function(data) {
      return JSON.stringify(data);
    }
  }
});

QuestionsSchema.options.toObject = {
  virturals: true,
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
};

QuestionsSchema.statics.getQuestionByOrdinal = function (ordinal) {
    return Questions.findOne( {'order' : parseInt(ordinal, 10)});
}

QuestionsSchema.statics.getQuestionById = function(question_id) {
    return  Questions.findOne( { '_id': ObjectID(question_id)} );
}

var Questions = mongoose.model('Questions', QuestionsSchema);
module.exports = Questions;
