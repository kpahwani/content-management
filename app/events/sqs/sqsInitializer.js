const { SQSClient } = require("@aws-sdk/client-sqs");
const { AWS_REGION: region, LOCALSTACK_HOST } = require('config');
const logger = require('../../helpers/logger');

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const localCredentials = {
    accessKeyId: '123',
    secretAccessKey: 'xyz'
};

const localConfig = {
    credentials: localCredentials,
    endpoint: LOCALSTACK_HOST,
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
const sqsClient = new SQSClient(conf);
logger.info('SQS connection established');

module.exports = sqsClient;

