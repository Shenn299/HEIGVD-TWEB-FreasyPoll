'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('results-charts', {
      url: '/results-charts',
      template: '<results-charts></results-charts>',
      authenticate: 'user'
    });
}
