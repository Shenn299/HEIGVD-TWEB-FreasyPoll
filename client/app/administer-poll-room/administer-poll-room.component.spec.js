'use strict';

describe('Component: AdministerPollRoomComponent', function() {
  // load the controller's module
  beforeEach(module('heigvdTwebFreasyPollApp.administer-poll-room'));

  var AdministerPollRoomComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AdministerPollRoomComponent = $componentController('administer-poll-room', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
