const AWS = require('aws-sdk');
const get = require('lodash.get');
const processMessage = require('./processMessage');

const { BUCKET_NAME, TABLE_NAME } = process.env;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();
const s3 = new AWS.S3({signatureVersion: 'v4'});

exports.handler = async function (event, context, callback) {

  const records = get(event, 'Records', []);

  try {

    await Promise.all(records.map(async record => {

      const Source = get(record, 'ses.mail.source');
      const destinations = get(record, 'ses.mail.destination', []);
      const messageId = get(record, 'ses.mail.messageId');

      await Promise.all(destinations.map(async destination => {

        let result;

        result = await dynamoDb.get({
          TableName: TABLE_NAME,
          Key: {
            from: destination
          }
        }).promise();

        const to = get(result, 'Item.to', []);

        if (!to.length) return;

        const Key = `emails/${destination}/${messageId}`;

        result = await s3.getObject({ Bucket: BUCKET_NAME, Key }).promise();

        const Data = processMessage(`${result.Body}`, Source, destination, to.join(','));

        result = await ses.sendRawEmail({
          Destinations: to,
          Source: destination,
          RawMessage: {
            Data
          }
        }).promise();

        console.log(result);

      }));

    }));

  } catch (err) {
    console.error(err);
  }

};
