const { S3Client } = require("@aws-sdk/client-s3");
const { AWS_REGION: region } = require('config');
const { localstackHost } = require('../../consts/uri');

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const localCredentials = {
    accessKeyId: '123',
    secretAccessKey: 'xyz'
};

const localConfig = {
    credentials: localCredentials,
    endpoint: localstackHost,
    forcePathStyle: true
};

const getAWSCredentialsOptions = () => {
    const env = process.env.NODE_ENV;
    if (env === 'local') {
        return localConfig;
    }
    return {
        region,
        accessKeyId,
        secretAccessKey
    };
};
const conf = getAWSCredentialsOptions();
const s3client = new S3Client(conf);

module.exports = s3client;