const { validateNotEmpty } = require('./library/validation');

/**
 * Peeks and returns a message in a Subscription's DeadLetterQueue
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to use
 * @param  {string} subscription - Subscription to use
 * @return {Promise}
 */
function peekDeadLetter(azureServiceBus, topic, subscription) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic, subscription], reject);

    azureServiceBus.receiveSubscriptionMessage(
      topic,
      `${subscription}/$DeadLetterQueue`,
      { isPeekLock: true },
      (error, message) => {
        if (error) return reject(error);
        return resolve(message);
      },
    );
  });
}

module.exports.peekDeadLetter = peekDeadLetter;
