'use strict';

describe('Component: CreatePollRoomComponent', function() {
  // load the controller's module
  beforeEach(module('heigvdTwebFreasyPollApp.create-poll-room'));

  var CreatePollRoomComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CreatePollRoomComponent = $componentController('create-poll-room', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
