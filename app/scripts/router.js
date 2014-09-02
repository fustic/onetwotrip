(function (module) {
  'use strict';
  /**
   * configure routes
   */
  module

    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

          // to be able state in any scope in applications. For example,
          // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
          // to active whenever 'contacts.list' or one of its decendents is active.
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
        }
      ]
    )
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
        $urlRouterProvider
          // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
          .otherwise('/');

        // $stateProvider to configure states.
        $stateProvider
          .state('home', {
            // Use a url of '/' to set a states as the 'index'.
            url: '/',
            templateUrl: 'views/main.html'
          })
          .state('contacts', {
            url: '/contacts',
            templateUrl: 'views/contacts.html'
          })
          .state('admin', {
            url: '/admin',
            templateUrl: 'views/admin.html',
            resolve: {
              //can not enter this state without auth
              auth: ['$q', '$location', 'AuthService', 'AuthPopup',
                function($q, $location, AuthService, AuthPopup){
                  var deferred = $q.defer();
                  if (AuthService.isAuthorized()) {
                    deferred.resolve();
                  } else {
                    AuthPopup.render();
                    $location.path('/');
                  }
                  return deferred.promise;
                }
              ]
            }
          });
      }
    ]
  );
})(angular.module('oneTwoTrip'));