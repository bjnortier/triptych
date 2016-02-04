const keys = require('lodash.keys');

module.exports = function(a, b, criteria) {
  criteria = criteria || {};
  let concatenations = criteria.concatenations || [];

  let result = {};
  concatenations.forEach((key) => {
    if (a[key] && b[key]) {
      result[key] = a[key] + ' ' + b[key];
    } else if (a[key]) {
      result[key] = a[key];
    } else if (b[key]) {
      result[key] = b[key];
    }
  });

  keys(a).forEach((key) => {
    if (concatenations.indexOf(key) === -1) {
      if (b.hasOwnProperty(key) && (b[key] !== a[key])) {
        throw new Error('option merge conflict: ' + key);
      }
      result[key] = a[key];
    }
  });

  keys(b).forEach((key) => {
    if (concatenations.indexOf(key) === -1) {
      if (a.hasOwnProperty(key) && (a[key] !== b[key])) {
        throw new Error('option merge conflict: ' + key);
      }
      result[key] = b[key];
    }
  });
  return result;
};
