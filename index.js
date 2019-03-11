const forwarder = require("aws-lambda-ses-forwarder");
const { FROM_EMAIL, TO_EMAIL } = process.env;

exports.handler = function (event, context, callback) {
  const overrides = {
    config: {
      fromEmail: FROM_EMAIL,
      subjectPrefix: "",
      emailBucket: "djmeph-email",
      emailKeyPrefix: `emails/${FROM_EMAIL}/`,
      forwardMapping: {
        [FROM_EMAIL]: [TO_EMAIL]
      }
    }
  };
  forwarder.handler(event, context, callback, overrides);
};
