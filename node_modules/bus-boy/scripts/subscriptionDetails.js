const camelcaseKeys = require('camelcase-keys');
const { validateNotEmpty } = require('./library/validation');

/**
 * Returns the full camelCased subscription details
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to use
 * @param  {string} subscription - Subscription to use
 * @return {Promise}
 */
function subscriptionDetails(azureServiceBus, topic, subscription) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic, subscription], reject);

    azureServiceBus.getSubscription(topic, subscription, (error, response) => {
      if (error) return reject(error);
      return resolve(camelcaseKeys(response, { deep: true }));
    });
  });
}

module.exports.subscriptionDetails = subscriptionDetails;
