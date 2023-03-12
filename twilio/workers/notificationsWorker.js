'use strict';

const Friend = require('../../models/friend');

const notificationWorkerFactory = function() {
  return {
    run: function() {
      Friend.sendNotifications();
    },
  };
};

module.exports = notificationWorkerFactory();