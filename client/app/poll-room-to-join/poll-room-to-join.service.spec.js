'use strict';

describe('Service: pollRoomToJoin', function() {
  // load the service's module
  beforeEach(module('heigvdTwebFreasyPollApp.poll-room-to-join'));

  // instantiate service
  var pollRoomToJoin;
  beforeEach(inject(function(_pollRoomToJoin_) {
    pollRoomToJoin = _pollRoomToJoin_;
  }));

  it('should do something', function() {
    expect(!!pollRoomToJoin).to.be.true;
  });
});
