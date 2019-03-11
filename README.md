# AWS SES Lambda Email Forwarder
### With Environment Variables

Use 'npm run build' to build archive.zip for upload to S3.

### Environment Variables:

`FROM_EMAIL` = Incoming email address

`TO_EMAIL` = Outgoing email recipient

`BUCKET_NAME` = S3 Bucket Name

### Instructions:

Setup SES Rule actions to store email in S3 Bucket, with prefix of `emails/{FROM_EMAIL}` and a second action to trigger lambda function.
