let chai = require('chai');
let server = require('../app');
let httpMocks = require('node-mocks-http');
let eventEmitter = require('events').EventEmitter();
let controller = require('../controllers/personality_controller');


describe('GET request to the introduction page', () => {
  it('should display a welcome to teh test page', (done) => {

      let response = httpMocks.createResponse({eventEmitter: eventEmitter});
      let request = httpMocks.createRequest({
                           method: 'GET',
                           url: '/ptest',
                           session: { 'user_id': '5c68ebfd2c10991ed4d1e119'}
                    });

      response.on('end', () => {
          console.log(response._getData());
          done();
       });

      response.on('send', () => {
          console.log(response._getData());
          done();
      });

      controller.introduction(request, response);

      console.log(response._getData());
      done();
   });
});
