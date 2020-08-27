const { validateNotEmpty } = require('./library/validation');

/**
 * Returns the count of messages in a subscripton
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to use
 * @param  {string} subscription - Subscription to use
 * @return {Promise}
 */
function subscriptionMsgCount(azureServiceBus, topic, subscription) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic, subscription], reject);

    azureServiceBus.getSubscription(topic, subscription, (error, response) => {
      if (error) return reject(error);
      return resolve(response.CountDetails);
    });
  });
}

module.exports.subscriptionMsgCount = subscriptionMsgCount;
