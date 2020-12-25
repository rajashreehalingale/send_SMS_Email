let AWS = require('aws-sdk');

function sendSMS(message, phonenumber) {
  let params = {
    Message: message,
    PhoneNumber: '+' + phonenumber,
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        'DataType': 'String',
        'StringValue': 'send345msgs' //request.query.subject
      }
    }
  }

  let publishSMSPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

  publishSMSPromise.then(
    function (data) {
      return JSON.stringify({ MessageID: data.MessageId });
    }).catch(
      function (err) {
        return JSON.stringify({ Error: err });
      });
}

module.exports = {
  sendSMS
}