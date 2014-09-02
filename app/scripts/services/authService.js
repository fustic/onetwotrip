(function (module) {
  'use strict';
  module
    .service('AuthService', ['$q', '$timeout', 'MessageBusService',
      function AuthService($q, $timeout, MessageBusService) {
        var
          channel = MessageBusService.getChannel('auth'),
          sessionTokenID = 'oneTwoTrip.auth.token',
          isUserAuthorized = !!loadFromSessionStorage(sessionTokenID),
          user = {
            id: 1,
            username: 'admin'
          },
          credentials = {
            email: 'admin@admin.com',
            password: 'admin12345'
          };

        function signOut() {
          isUserAuthorized = false;
          saveToSessionStorage(sessionTokenID, null);
          publishUserSignedOut();
        }

        channel.subscribe('signOut', signOut);
        function publishUserAuthed() {
          channel.publish('user.authorized');
        }
        function publishUserSignedOut() {
          channel.publish('user.signedout');
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

        if (isUserAuthorized) {
          publishUserAuthed();
        }
        return {
          /**
           * is user authorized
           * @returns {boolean}
           */
          isAuthorized: function isAuthorized() {
            return isUserAuthorized;
          },
          /**
           * @param {string} email
           * @param {string} password
           */
          authenticate: function authenticate(email, password) {
            var
              deferred = $q.defer();

            $timeout(function () {
              if (email === credentials.email && password === credentials.password) {
                isUserAuthorized = true;
                saveToSessionStorage(sessionTokenID, user);
                publishUserAuthed();
                deferred.resolve();
              } else {
                isUserAuthorized = false;
                saveToSessionStorage(sessionTokenID, null);
                publishUserSignedOut();
                deferred.reject();
              }
            }, 10);

            return deferred.promise;
          },
          signOut: signOut
        };
      }
    ]);
})(angular.module('oneTwoTrip'));

