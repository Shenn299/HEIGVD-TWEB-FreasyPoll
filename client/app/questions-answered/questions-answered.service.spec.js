'use strict';

describe('Service: questionsAnswered', function() {
  // load the service's module
  beforeEach(module('heigvdTwebFreasyPollApp.questions-answered'));

  // instantiate service
  var questionsAnswered;
  beforeEach(inject(function(_questionsAnswered_) {
    questionsAnswered = _questionsAnswered_;
  }));

  it('should do something', function() {
    expect(!!questionsAnswered).to.be.true;
  });
});
