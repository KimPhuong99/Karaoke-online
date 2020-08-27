const { validateNotEmpty } = require('./library/validation');

/**
 * Creates a message for a given topic
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to publish message on
 * @param  {object} message - Message to publish
 * @return {Promise}
 */
function createMessage(azureServiceBus, topic, message) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic, message], reject);

    const topicMessage = {
      body: JSON.stringify(message),
    };

    azureServiceBus.sendTopicMessage(topic, topicMessage, (error) => {
      if (error) return reject(error);
      return resolve(true);
    });
  });
}

module.exports.createMessage = createMessage;
