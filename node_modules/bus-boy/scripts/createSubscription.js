const { validateNotEmpty } = require('./library/validation');

const SUBSCRIPTION_EXISTS_CODE = 409;

/**
 * Creates a subscription for a given topic
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic used in subscripton creation
 * @param  {string} subscription - Subscription to create
 * @return {Promise}
 */
function createSubscription(azureServiceBus, topic, subscription) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic, subscription], reject);

    azureServiceBus.createSubscription(topic, subscription, (error) => {
      // do not reject if subscription exists error
      if (error && error.statusCode !== SUBSCRIPTION_EXISTS_CODE) return reject(error);
      // subscription is created or exists
      return resolve(true);
    });
  });
}

module.exports.createSubscription = createSubscription;
