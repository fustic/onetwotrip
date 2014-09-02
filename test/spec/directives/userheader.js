'use strict';

describe('Directive: UserHeader', function () {

  // load the directive's module
  beforeEach(module('oneTwoTripTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-user-header></-user-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the UserHeader directive');
  }));
});
