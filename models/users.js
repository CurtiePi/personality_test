var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;


var UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  age: {type: Number,
        trim: true
  },
  gender: {
    type: String,
    required: true,
  }
});

UsersSchema.options.toObject = {
  virturals: true,
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret.__v;
  }
};

UsersSchema.statics.listUsers = function(callback) {
  console.log('Finding users');
  User.find({}).
    exec(function(error, users) {
     if (error) {
       return callback(error);
     }

     return callback(null, users);
  });
};

var Users = mongoose.model('Users', UsersSchema);
module.exports = Users;
