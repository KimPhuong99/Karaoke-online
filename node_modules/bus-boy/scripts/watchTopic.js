const debug = require('debug')('bus-boy:watch-topic');
const { validateNotEmpty } = require('./library/validation');

let interval = null;
let serviceBus = null;
let topicToWatch = null;
let temporarySubscriptionName = null;

// service bus error messages
const NO_MESSAGE = 'No messages to receive';
const NOT_FOUND = 'Error: NotFound';

/**
 * Cleans up module variables
 */
function clean() {
  temporarySubscriptionName = null;
  topicToWatch = null;
  interval = null;
  serviceBus = null;
}

/**
 * Returns the full camelCased subscription details
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to watch
 * @param  {string} subscription - Subscription to create
 * @param  {function} onMessageCallback - Callback to invoke when a message is received
 */
function createSubscriptionAndReceiveMessages(azureServiceBus, topic, subscription, onMessageCallback) {
  serviceBus.createSubscription(topicToWatch, temporarySubscriptionName, (createSubscriptionError) => {
    if (createSubscriptionError) {
      clean();
      debug(createSubscriptionError);
      return createSubscriptionError;
    }

    debug(`Created temporary subscription: ${temporarySubscriptionName}`);

    interval = setInterval(() => {
      serviceBus.receiveSubscriptionMessage(topicToWatch, temporarySubscriptionName, (error, message) => {
        if (onMessageCallback && typeof onMessageCallback === 'function') {
          if (error && error !== NO_MESSAGE && error !== NOT_FOUND) {
            onMessageCallback(error);
          } else if (message) {
            onMessageCallback(message);
          }
        }
      });
    }, 100);
  });
}

/**
 * Allows consumer to delete the temp subscription and stop watching the topic
 */
function onSIGINT() {
  if (interval && serviceBus && topicToWatch && temporarySubscriptionName) {
    clearInterval(interval);

    serviceBus.deleteSubscription(topicToWatch, temporarySubscriptionName, (error) => {
      if (error) debug(`Error removing the temporary subscription: ${temporarySubscriptionName}`);
      debug(`Deleted temporary subscription ${temporarySubscriptionName}`);
      clean();
    });
  }
}

/**
 * Returns the full camelCased subscription details
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {string} topic - Topic to use
 * @param  {function} onMessageCallback - Callback to invoke when a message is received
 */
function run(azureServiceBus, topic, onMessageCallback) {
  validateNotEmpty([azureServiceBus, topic], error => debug(error));

  // set module variables
  serviceBus = azureServiceBus;
  topicToWatch = topic;
  temporarySubscriptionName = `temp-subscription-${Date.now()}`;

  createSubscriptionAndReceiveMessages(azureServiceBus, topic, temporarySubscriptionName, onMessageCallback);
}

module.exports.run = run;
module.exports.onSIGINT = onSIGINT;
