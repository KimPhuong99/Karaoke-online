const isEmpty = require('lodash/isEmpty');

/**
 * Checks if value is an empty object, collection, map, or set.  Invokes provided reject function if an empty param is found.
 *
 * Objects are considered empty if they have no own enumerable string keyed properties.
 * Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered
 * empty if they have a length of 0. Similarly, maps and sets are considered empty if they have a size of 0.
 * @see https://lodash.com/docs/4.17.4#isEmpty
 * @param  {array} params - Array of params to validate are not empty
 * @param  {function} onError - Callback to handle errors
 * @return {bool} - Returns true if params are not empty, throws otherwise
 */
function validateNotEmpty(params, onError) {
  if (params && Array.isArray(params) && typeof onError === 'function') {
    for (let i = 0; i < params.length; i += 1) {
      const param = params[i];
      if (isEmpty(param)) {
        onError(new Error('Required param is missing'));
        break;
      }
    }
  }

  return true;
}

module.exports.validateNotEmpty = validateNotEmpty;
