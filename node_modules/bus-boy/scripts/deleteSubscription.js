const { validateNotEmpty } = require('./library/validation');

/**
 * Deletes a subscription
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic that owns the subscripton to delete
 * @param  {string} subscription - Subscription delete
 * @return {Promise}
 */
function deleteSubscription(azureServiceBus, topic, subscription) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic, subscription], reject);

    azureServiceBus.deleteSubscription(topic, subscription, (error) => {
      if (error) return reject(error);
      return resolve(true);
    });
  });
}

module.exports.deleteSubscription = deleteSubscription;
