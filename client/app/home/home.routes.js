'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('presenter-home', {
      url: '/home',
      template: '<home></home>',
      authenticate: 'user'
    });
}
