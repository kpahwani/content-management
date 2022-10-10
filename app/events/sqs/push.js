const { SendMessageCommand } =  require("@aws-sdk/client-sqs");
const VError = require('verror');
const logger = require('../../helpers/logger');
const sqsClient = require('./sqsInitializer');
const { FEED_SERVICE_SQS_URL: QueueUrl } = require('config');

/**
 * Build the message
 * @param eventType
 * @param payload
 * @returns {{MessageBody: *, QueueUrl: *}}
 */
function buildMessage(eventType, payload = {}) {
    return {
        MessageBody: JSON.stringify({
            eventType,
            payload
        }),
        QueueUrl
    };
}

/**
 * Push message to SQS
 * @param eventType
 * @param payload
 * @returns {Promise<void>}
 */
async function push(eventType, payload) {
    let sqsResponse;
    const message = buildMessage(eventType, payload);

    try {
        sqsResponse = await sqsClient.send(new SendMessageCommand(message));
    } catch (err) {
        throw new VError({ cause: err, info: { eventType, payload }}, 'Message could not be sent to SQS');
    }

    logger.info(`Message has been pushed to the queue, MessageID: ${sqsResponse.MessageId}`, { eventType, payload });

    return sqsResponse;
}

module.exports = {
    push
};
