'use strict';

describe('Service: currentPollRoom', function() {
  // load the service's module
  beforeEach(module('heigvdTwebFreasyPollApp.current-poll-room'));

  // instantiate service
  var currentPollRoom;
  beforeEach(inject(function(_currentPollRoom_) {
    currentPollRoom = _currentPollRoom_;
  }));

  it('should do something', function() {
    expect(!!currentPollRoom).to.be.true;
  });
});
