(function (module) {
  'use strict';
  /**
   * create header element with user Actions
   */
  module
    .directive('userHeader', function () {
      return {
        restrict: 'E',
        templateUrl: 'views/header.html',
        controller: function (MessageBusService, AuthService) {
          var channel = MessageBusService.getChannel('auth');
          this.isAuthorized = AuthService.isAuthorized();

          this.signOut = function signOut() {
            channel.publish('signOut');
            this.isAuthorized = false;
          };

          channel.subscribe('user.authorized', function callback() {
              this.isAuthorized = true;
            }.bind(this)
          );
        },
        controllerAs: 'user'
      };
    });
})(angular.module('oneTwoTrip'));
