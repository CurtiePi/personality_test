# Personality Test

The personality test is basically short answer test which allows users to answer various 
questions and stores the users' answers; allowing the user to review and change the answers
as they see fit.


## Tools used

The primary language for the application is NodeJS using the Express framework. 

The templating is based on EJS while the database is MongoDB using Mongoose as the ORM for the 
data models.

Testing frameworks used include Mocha and Chai.


## Set up

There are four models at this stage of the development:
1. Questions  - the questions being asked of the user
2. Users      - The person or person(s) answering the questions
3. Categories - Categories that the questions fit into
4. Answers    - A mapping of questions to user and user answers.

The application is build with an MVC framwork in mind:

Sever
 app.js - is the main server function

Controllers
 personality_controller - adjudicates requests made to the router 
 controller_helper - primarily performs as the data access layer for the controller

Routes
 routes_personality - routes requests to the controllers to be adjuticated

Templates
 index.ejs - splash page where the user identifies themselves. In the interst of time a fully
             system of authentication and login functionality was not implmented.

 into_page.ejs - Entry point into the quiz

 question_page.ejs - display for the questions where the user can anwer and later review those answers

 goodbye.ejs - final page after the test is complete, currently only loops back to into_page.ejs

 Test 
 The tests can be found in the test folder


## Installation

For development and testing the configuration is based on the contents of the .env file
currently the file is set up with the following:           
NODE_ENV='test'
DEV_APP_PORT=3002
DEV_DB_HOST='127.0.0.1'
DEV_DB_PORT='27017'
DEV_DB_NAME='personality_dev'
TEST_APP_PORT=3000
TEST_DB_HOST='127.0.0.1'
TEST_DB_PORT='27017'
TEST_DB_NAME='personality_test'
DEBUG=app

Change the environment by changing the NODE_ENV value to either 'dev' or 'test'

Data for the Questions and Categories were pre supplied and exists in two files:
./assets/dev_questions.json - The full listing of categories and questions in a JSON formatted file
./assets/testquestions.json -  An full listing of categories and an abbreviated listing questions in a JSON formatted file
./assets/dev_users.json - A list of users created primarily for testing purposes
./assets/test_users.json - A list of users created primarily for testing purposes


There are 2 migration scripts in the root directory:
migrate_questions.js - migrates the categories and questions to the database
migrate_users.js - migrates the users into the database

Both files will change which database to user based on the value of NODE_ENV 

Once you have your NODE_ENV set you can start the server by doing the following:

cd personality_test

node app.js

open your browser to localhost:3000 

### What to Expect
1. Select which person you would like to answer the questions as
2. Start the quiz
3. Answer the Quesions, note tehre may be follow up questions.
4. When they quiz is over you can review and chnge your questions as you see fit


## Notes

I chose Personality Test because I like the idea of setting up the table structure and right now I am thinking I like the challenge of figure out an efficient way to store the answers. Also it reminds me of trivia games that I enjoy playing.

Some thoughts:
I could really use more practice with setting up the testing suites. Especially when it comes to trying to test when a session variable comes
into play. The documentation for that scenario is all over the place.

The twist in the questions data was that one of the main questions has a follow up. Since the plan was to save the the answers as a 
user id/question id key pair with the answer as a value, there was the need to have each question have an id. So when migrating the data
the follow up question was stored without an order number with the main question using the "if_positive" field as a pointer to the follow up
question. So when the main question is answered, there's a check to see if there is a follow up and if the conditions are satisfied, if so the
follow up question is shown, though it displsy the same order number as the main question.

Overall I found this project fun and a bit challenging (testing). I did find the testing to be very helpful especially when I made some 
changes later in the process. I would have liked to have found a clever way to implement the Emitter class. Also using the JSON data directly
from the file was considered but that thought died soon after the thought of using MySql for the database layer. 

Now it's on to the next big thing...
