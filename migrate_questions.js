var config = require('./config');
var path = require('path');
console.log(path.join(__dirname, config.data.questions));
database_data = require(path.join(__dirname, config.data.questions));
//var database_data = require ('../personality_test_short');
var mongoose = require('mongoose');

var Questions = require('./models/questions');
var Categories = require('./models/categories');

async function openConnection() {
    let host = config.db.host;
    let port = config.db.port;
    let name = config.db.name; 
    connect_str = 'mongodb://' + host + ':' + port + '/' + name;
    var conn = await mongoose.connect(connect_str, {useNewUrlParser: true,
                                                    useCreateIndex: true, 
                                                    keepAlive: true});
    console.log('We have a connection the the database....');
}

function closeConnection(){
    mongoose.connection.close();
    console.log('We have closed the connection the the database....');

    console.log('Migration complete.....');
}


async function migrateData(){
    await openConnection();
   
    for (var key in database_data){
        switch(key) {
           case 'categories':
               console.log('Inserting category data into the Categories collection....');
               await storeCategories(database_data[key]);
               break;
           case 'questions':
               console.log('Inserting question data into the Questions collection....');
               await parseQuestions(database_data[key]);
               break;
        }
    }

    closeConnection();
}


async function storeCategories(category_values) {

    for (var key in category_values){
        var categories = new Categories({"name" : category_values[key]});
        await createDocument(categories)
    }
}

async function parseQuestions(questions) {

    seq_count = 1;
    console.log("The number of questions is : " + questions.length);
    for (var query in questions){
        main_question = questions[query];
        main_question.order = seq_count;
        // Can store the question obj as is unless there is a condition
        if (main_question.question_type.condition) {
            follow_up_question = main_question.question_type.condition.if_positive;
            var question = new Questions(follow_up_question);
            id = await createDocument(question);

            console.log("Sending a follow up question to the database...");
            main_question.question_type.condition.if_positive = id;
        }

        console.log("Sending a main  question to the database...");
        var question = new Questions(main_question);
        var doc = await createDocument(question);
        seq_count++;              
    }
}
    
async function createDocument(modelInstance) {
    
    let document = await modelInstance.save();
    result = document.id;

    return result
}

migrateData();
