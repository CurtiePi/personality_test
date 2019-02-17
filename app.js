var config = require('./config');
var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var personalityRouter = require('./routes/personality_route');


let db_host = config.db.host;
let db_port = config.db.port;
let db_name = config.db.name;

connect_str = 'mongodb://' + db_host + ':' + db_port + '/' + db_name;
mongoose.connect(connect_str, {useNewUrlParser: true,
                               useCreateIndex: true, 
                               keepAlive: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});


var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Uncomment after placing your favicon in /public
app.use(logger('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', personalityRouter);


//Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

let app_port = config.app.port;
app.listen(app_port);
console.log("You're listening on port " + app_port);

module.exports = app;
