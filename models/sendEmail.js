let AWS = require('aws-sdk');
// process.env
function sendEmail(message, subject) {
  console.log(process.env.AWS_SNS_TOPIC_ARN);

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

module.exports = {
  sendEmail
}