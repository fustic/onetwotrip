(function (module) {
  module
    .factory('AuthPopup', ['$modal', '$location', 'AuthService',
      function AuthPopup($modal, $location, AuthService) {

        function render() {
          $modal.open({
            templateUrl: 'views/authpopup.html',
            windowClass: 'authpopup',
            controller: function controller($scope, $modalInstance) {
              $scope.credentials = {};
              $scope.message = '';
              $scope.close = function () {
                $modalInstance.dismiss('cancel');
              };
              $scope.auth = function authenticate() {
                AuthService.authenticate($scope.credentials.email, $scope.credentials.password).then(
                  function success() {
                    $modalInstance.dismiss('cancel');
                    $location.path('/admin');
                  },
                  function error() {
                    $scope.message = 'Email or login is invalid, please try again';
                  }
                );
              };
            }
          });
        }

        return {
          render: function () {
            render();
          }
        }
      }
    ]);

})(angular.module('oneTwoTrip'));