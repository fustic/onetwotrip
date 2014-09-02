(function (module, postal) {
  'use strict';
  module
    .service('MessageBusService',
      function MessageBusService() {
        var
          defaultChannel = postal.channel(),
          channels = {};

        /**
         * returns message bus channel if it exists or will create it
         * @param {string} channelName
         */
        function getChannel(channelName) {
          var
            channel = channels[channelName];
          if (!channel) {
            channel = postal.channel(channelName);
            channels[channelName] = channel;
          }
          return channel;
        }
        return {
          /**
           * returns message bus channel
           * @param {string} [channelName]
           */
          getChannel: function (channelName) {
            if (channelName) {
              return getChannel(channelName);
            }
            return defaultChannel;
          }
        };
      }
    );
})(angular.module('oneTwoTrip'), postal);

