const { validateNotEmpty } = require('./library/validation');

/**
 * Receives all messages from a Subscription's DeadLetterQueue
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to use
 * @param  {string} subscription - Subscription to use
 * @param  {string} directory - Subscription to use
 * @return {Promise}
 */
function receiveDeadLetter(azureServiceBus, topic, subscription) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic, subscription], reject);

    azureServiceBus.receiveSubscriptionMessage(
      topic,
      `${subscription}/$DeadLetterQueue`,
      { isPeekLock: false },
      (error, message) => {
        if (error) return reject(error);
        return resolve(message);
      },
    );
  });
}

module.exports.receiveDeadLetter = receiveDeadLetter;
