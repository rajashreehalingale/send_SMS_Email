let AWS = require('aws-sdk');

function sendEmail(message, subject) {

  let sns = new AWS.SNS();
  let params = {
    Message: message,
    Subject: subject,
    TopicArn: process.env.AWS_SNS_TOPIC_ARN
  };
  // sns.publish(params, context.done);
  // return 'sss';
  let publishEmailPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
  publishEmailPromise.then(
    function (data) {
      return JSON.stringify({ MessageID: data.MessageId });
    }).catch(
      function (err) {
        return JSON.stringify({ Error: err });
      });

}

function subscribeEmail(emailAddress) {
  // Set region
  AWS.config.update({ region: process.env.AWS_REGION });

  // Create subscribe/email parameters
  var params = {
    Protocol: 'EMAIL', /* required */
    TopicArn: process.env.AWS_SNS_TOPIC_ARN, /* required */
    Endpoint: emailAddress
  };

  // Create promise and SNS service object
  var subscribePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).subscribe(params).promise();

  // Handle promise's fulfilled/rejected states
  subscribePromise.then(
    function (data) {
      console.log("Subscription ARN is " + data.SubscriptionArn);
    }).catch(
      function (err) {
        console.error(err, err.stack);
      });
}

module.exports = {
  sendEmail,
  subscribeEmail
}