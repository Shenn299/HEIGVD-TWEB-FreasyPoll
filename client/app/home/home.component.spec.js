'use strict';

describe('Component: HomeComponent', function() {
  // load the controller's module
  beforeEach(module('heigvdTwebFreasyPollApp.home'));

  var HomeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    HomeComponent = $componentController('home', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
