const { validateNotEmpty } = require('./library/validation');

/**
 * List Subscriptions for a topic
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to use
 * @return {Promise}
 */
function listSubscriptions(azureServiceBus, topic) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic], reject);

    azureServiceBus.listSubscriptions(topic, (error, subscriptions) => {
      if (error) return reject(error);
      return resolve(subscriptions);
    });
  });
}

module.exports.listSubscriptions = listSubscriptions;
