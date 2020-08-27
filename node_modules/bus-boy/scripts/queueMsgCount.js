const { validateNotEmpty } = require('./library/validation');

/**
 * Returns the count of messages in a subscripton
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} queue - Queue to use
 * @return {Promise}
 */
function queueMsgCount(azureServiceBus, queue) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus, queue], reject);

    azureServiceBus.getQueue(queue, (error, response) => {
      if (error) return reject(error);
      return resolve(response.CountDetails);
    });
  });
}

module.exports.queueMsgCount = queueMsgCount;
