'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('create-question', {
      url: '/create-question',
      template: '<create-question></create-question>',
      authenticate: 'user'
    });
}
