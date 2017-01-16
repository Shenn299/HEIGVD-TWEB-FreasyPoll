'use strict';

describe('Component: ResultsChartsComponent', function() {
  // load the controller's module
  beforeEach(module('heigvdTwebFreasyPollApp.results-charts'));

  var ResultsChartsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ResultsChartsComponent = $componentController('results-charts', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
