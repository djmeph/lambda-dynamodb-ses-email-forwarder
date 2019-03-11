const forwarder = require("aws-lambda-ses-forwarder");
const { FROM_EMAIL, TO_EMAIL, BUCKET_NAME } = process.env;

exports.handler = function (event, context, callback) {
  const overrides = {
    config: {
      fromEmail: FROM_EMAIL,
      subjectPrefix: "",
      emailBucket: BUCKET_NAME,
      emailKeyPrefix: `emails/${FROM_EMAIL}/`,
      forwardMapping: {
        [FROM_EMAIL]: [TO_EMAIL]
      }
    }
  };
  forwarder.handler(event, context, callback, overrides);
};
