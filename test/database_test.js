const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

// Create a new schema that accepts a Answer object
// question_id - String
// user_id - String
// answer - String
const testSchema = new Schema({
 question_id: { type: String, required: true},
 user_id: {type: String, required: true},
 answer: {type: String}
});

const Answer = mongoose.model('Answer', testSchema);

describe('Database Tests', function() {

  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase', {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Connected to the test database...');
      done();
    });
  });

  after(function (done) {
    mongoose.connection.close();
    done();
  });

  describe('Database Tests', function() {
    // Save Answer
    it('New Answer saved to test database', function (done) {
      var testAnswer = Answer({
        question_id: '5b28d8dc46a17038462302b6',
        user_id: '5b1622f887101ef6cc00d8b8',
        answer: 'introversion'
      });

      testAnswer.save(done);
    });


    it('Dont save poorly formatted object to database', function (done) {
      var incorrectFormat = Answer({
        q_id: '5b28d8dc46a17038462302b6',
        u_id: '5b1622f887101ef6cc00d8b8',
        answer: 'very important'
      });

      incorrectFormat.save(err => {
        if (err) {return done(); }
        throw new Error('Should generate error...Incorrent Format');
      });
    });

    it('Dont save object with missing required fields', function (done) {
      var missingRequired = Answer({
        u_id: '5b1622f887101ef6cc00d8b8',
        answer: 'very important'
      });

      missingRequired.save(err => {
        if (err) { return done(); }
        throw new Error('Should generate error...Missing required fields!');
      });
    });

    it('Should retrieve Answer from the test database', function(done) {
      Answer.find({question_id: '5b28d8dc46a17038462302b6', user_id: '5b1622f887101ef6cc00d8b8'}, (err, answer) => {
        if (err) {throw err; }
        if (answer.length === 0 ) {throw new Error('No answer found...');}
        done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });

});


