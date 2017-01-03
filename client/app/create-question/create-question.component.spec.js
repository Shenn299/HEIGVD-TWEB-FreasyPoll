'use strict';

describe('Component: CreateQuestionComponent', function() {
  // load the controller's module
  beforeEach(module('heigvdTwebFreasyPollApp.create-question'));

  var CreateQuestionComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CreateQuestionComponent = $componentController('create-question', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
