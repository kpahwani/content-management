const { Consumer } = require('sqs-consumer');
const { aws: { sqs: { visibilityTimeout }}, ISSUE_TO_BCF_SQS_URL: queueUrl, AWS_REGION: region } = require('config');
const _ = require('lodash');
const VError = require('verror');
const { sqs } = require('./sqsInitializer');
const { handleMessage } = require('./handleMessage');
const { getLogger } = require('../../helpers/logger');
const logger = getLogger();

/**
 * Parse message body
 * @param message
 */
function parseMessageBody(message) {
    if (!message.Body) {
        throw new VError({ info: { message }}, 'Empty message body has been received');
    }

    try {
        if (_.isString(message.Body)) {
            message.Body = JSON.parse(message.Body);
        }
    } catch (err) {
        throw new VError({ cause: err, info: { messageBody: message.Body }}, 'JSON.parse has thrown an error');
    }
}

/**
 * Create SQS consumer
 * @returns {Consumer}
 */
function createConsumer() {
    const consumer = Consumer.create({
        queueUrl,
        visibilityTimeout,
        region,
        handleMessage,
        sqs
    });

    consumer.on('error', err => {
        logger.error('AWS SQS error', { err });
    });
    consumer.on('processing_error', err => {
        logger.error('AWS SQS processing error', { err, queueUrl, region });
    });
    consumer.on('timeout_error', err => {
        logger.error('AWS SQS timeout error', { err, queueUrl, region });
    });
    consumer.on('message_received', message => {
        parseMessageBody(message);
        logger.info('Message has been received', { message, queueUrl, region });
    });
    consumer.on('message_processed', () => {
        logger.info('Message was processed successfully and is being removed from the queue', { queueUrl, region });
    });
    consumer.on('stopped', () => {
        logger.error('Consumer stopped', { queueUrl, region });
    });

    return consumer;
}

/**
 * Listen to SQS queue
 */
function listen() {
    if (sqs.config.credentials && sqs.config.credentials.hasOwnProperty('accessKeyId')) {
        logger.info('SQS accessKeyId: ', { accessKeyId: sqs.config.credentials.accessKeyId });
        logger.info('SQS sessionToken availability: ', { available: (sqs.config.credentials.sessionToken) ? true : false });
        logger.info('SQS errorCode: ', { errCode: sqs.config.credentials.errorCode });
        logger.info('SQS config region: ', { region: sqs.config.region });
        logger.info('SQS endpoint: ', { endpoint: sqs.config.endpoint });
    } else {
        logger.info('SQS config credential are not initialised');
    }
    logger.info('SQS queueUrl: ', { queueUrl });
    logger.info('SQS visibilityTimeout: ', { visibilityTimeout });
    logger.info('SQS region: ', { region });

    const consumer = createConsumer();
    logger.info('Started listening to SQS');
    consumer.start();
}

module.exports = {
    listen,
    parseMessageBody
};
