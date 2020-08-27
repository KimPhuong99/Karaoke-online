const { validateNotEmpty } = require('./library/validation');

const NUMBER_OF_TOPICS = 100;
const TOPIC_SKIP = 0;
const TOPIC_COUNT = 0;

/**
 * Gets the next n topics
 * @param  {object} azureServiceBus - Service Bus Instance
 * @param  {number} numberOfTopics - Number of topics to get
 * @param  {number} skip - Number of topics to skip
 * @param  {number} count - Topic count to start at
 * @param  {function} onDone - Invoked when we have built all the topics
 * @param  {function} onError - Invoked on error
 * @param  {array} topics - Array to store list of topics
 */
function getNext(azureServiceBus, numberOfTopics, skip, count, onDone, onError, topics = []) {
  let topicCount = count;

  azureServiceBus.listTopics({ top: numberOfTopics, skip }, (error, result) => {
    if (error) return onError(error);

    result.forEach((topic) => {
      topics.push(topic.TopicName);
      topicCount += 1;
    });

    if (result.length === numberOfTopics) {
      getNext(azureServiceBus, numberOfTopics, skip + numberOfTopics, topicCount, onDone, onError, topics);
    } else {
      return onDone({ topics, topicCount });
    }
  });
}

/**
 * List Topics
 * @param  {object} azureServiceBus - Service Bus Instance
 * @return {Promise}
 */
function listTopics(azureServiceBus) {
  return new Promise((resolve, reject) => {
    validateNotEmpty([azureServiceBus], reject);
    getNext(azureServiceBus, NUMBER_OF_TOPICS, TOPIC_SKIP, TOPIC_COUNT, resolve, reject);
  });
}

module.exports.listTopics = listTopics;
