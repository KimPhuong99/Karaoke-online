const { validateNotEmpty } = require('./library/validation');

/**
 * Deletes a topic
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to delete
 * @return {Promise}
 */
function deleteTopic(azureServiceBus, topic) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, topic], reject);

    azureServiceBus.deleteTopic(topic, (error) => {
      if (error) return reject(error);
      return resolve(true);
    });
  });
}

module.exports.deleteTopic = deleteTopic;
