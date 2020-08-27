const { validateNotEmpty } = require('./library/validation');

/**
 * List Rules for a topic / subscription
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to use
 * @param  {string} subscription - Subscription to use
 * @return {Promise}
 */
function listRules(azureServiceBus, topic, subscription) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic, subscription], reject);

    azureServiceBus.listRules(topic, subscription, (error, rules) => {
      if (error) return reject(error);
      return resolve(rules);
    });
  });
}

module.exports.listRules = listRules;
