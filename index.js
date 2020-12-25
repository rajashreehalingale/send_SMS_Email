const Express = require('express');
const sendSMS = require('./models/sendSMS');
const { sendEmail,
  subscribeEmail } = require('./models/sendEmail');
require('dotenv').config();

const app = Express();

app.get('/', (request, response) => {
  console.log("Message = " + request.query.message);
  console.log("Number = " + request.query.number);
  console.log("Subject = " + request.query.subject);

  const result = sendSMS.sendSMS(request.query.message, request.query.number);
  response.end(result);
});

app.get('/email', (request, response) => {
  console.log("Message = " + request.query.message);
  console.log("Subject = " + request.query.subject);

  const result = sendEmail.sendEmail(request.query.message, request.query.subject);
  response.end(result);
});

app.get('/emailsubscribe', (request, response) => {
  console.log("Email Subscribe = " + request.query.emailsubscribe);

  const result = subscribeEmail('raj.sandeep.at@gmail.com'); // request.query.emailAddress);
  response.end(result);
});

app.listen(3000, () => console.log('SMS Service Listening on PORT 3000'));
