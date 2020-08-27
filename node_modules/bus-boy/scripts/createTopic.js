const { validateNotEmpty } = require('./library/validation');

/**
 * Creates a topic
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to create
 * @return {Promise}
 */
function createTopic(azureServiceBus, topic) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic], reject);

    azureServiceBus.createTopicIfNotExists(topic, (error) => {
      // this does not throw if topic exists
      if (error) return reject(error);
      // topic is created or exists
      return resolve(true);
    });
  });
}

module.exports.createTopic = createTopic;
