'use strict';

describe('Component: PollRoomComponent', function() {
  // load the controller's module
  beforeEach(module('heigvdTwebFreasyPollApp.poll-room'));

  var PollRoomComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PollRoomComponent = $componentController('poll-room', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
