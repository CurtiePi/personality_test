var config = require('./config');
var path = require('path');
let data_path = path.join(__dirname, config.data.answers);
var database_data = require(data_path);
var mongoose = require('mongoose');

var Answers = require('./models/answers');

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

    var data = database_data['answers'];
    for (var key in data){
        var answers = new Answers(data[key]);
        await answers.save();
    }

    closeConnection();
}

migrateData();
