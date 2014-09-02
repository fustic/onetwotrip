(function (module) {
  'use strict';
  module
    .service('AuthService', ['$q', 'MessageBusService',
      function AuthService($q, MessageBusService) {
        var
          channel = MessageBusService.getChannel('auth'),
          sessionTokenID = 'oneTwoTrip.auth.token',
          isUserAuthorized = !!loadFromSessionStorage(sessionTokenID);

        function publishUserAuthed() {
          channel.publish('user.authorized');
        }
        function loadFromSessionStorage(storageID) {
          if (!sessionStorage) {
            return null;
          }
          return JSON.parse(sessionStorage.getItem(storageID) || null);
        }
        function saveToSessionStorage(storageID, entries) {
          if (!sessionStorage) {
            return null;
          }
          sessionStorage.setItem(storageID, JSON.stringify(entries));
        }

        if (true || isUserAuthorized) {
          publishUserAuthed();
        }
        return {
          /**
           * is user authorized
           * @returns {boolean}
           */
          isAuthorized: function isAuthorized() {
            return isUserAuthorized;
          }
        };
      }
    ]);
})(angular.module('oneTwoTrip'));

