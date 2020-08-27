*This package is not ready for prime time, hence the <1.0.0 version number. Stay tuned!*

## Bus-Boy
A collection of scripts used to interact with Azure Service Bus

### Usage
These scripts are meant to be extended for use as a CLI, in a GUI, or any other tool to provide users
with access to Azure Service Bus topics and subscription data.

Add as an npm module to your project
```js
npm -i bus-boy --save
```
*_assumes you have node and npm installed_

### Available scripts
   `createMessage`        - Creates a message on the specified topic.\
   `createSubscription`   - Creates the specified subscription.\
   `createTopic`          - Creates the specified topic.\
   `deleteSubscription`   - Deletes the specified subscription.\
   `deleteTopic`          - Deletes the specified topic.\
   `listRules`            - Returns all rules for a subscription.\
   `listSubscriptions`    - Returns all subscriptions for the specified topic.\
   `listTopics`           - Returns all topics for the current Service Bus connection. Also returns a count of topics.\
   `peekDeadLetter`       - Peeklocks and returns the first retrieved message in the specified subscription's dead letter queue.\
   `peekSubscription`     - Peeklocks and returns the first retrieved message in the specified subscription.\
   `subscriptionDetails`  - Returns the details of the specified subscription.\
   `subscriptionMsgCount` - Returns the current count of messages in the specified subscription.\
   `queueMsgCount`        - Returns the current count of messages in the specified queue.\
   `watchTopic`           - Creates a temporary subscription on the configured topic and returns incoming messages.

### Documentation for the _Azure SDK for Node_ can be found here:
http://azure.github.io/azure-sdk-for-node/

### Basic Usage
```javascript
const busBoy = require('bus-boy');
const azureSb = require('azure-sb');

const connectionString = 'my-service-bus-connection-string';
const azureServiceBus = azureSb.createServiceBusService(connectionString);

busBoy
  .subscriptionDetails(azureServiceBus, 'my-topic-name', 'my-subscription')
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.log(error);
  });
  ```

### Basic Watch Topic Usage
```javascript
const busBoy = require('bus-boy');
const azureSb = require('azure-sb');

const connectionString = 'my-connection-string';
const azureServiceBus = azureSb.createServiceBusService(connectionString);

const { watchTopic } = busBoy;

// callback to handle messages
function onMessage(message) {
  console.log('%O', message);
}

// stop watching topic after 5 seconds
setTimeout(() => { watchTopic.onSIGINT(); }, 5000);

// start watching topic
watchTopic.run(azureServiceBus, topic, onMessage);
```
