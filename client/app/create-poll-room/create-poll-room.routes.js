'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('create-poll-room', {
      url: '/create-poll-room',
      template: '<create-poll-room></create-poll-room>',
      authenticate: 'user'
    });
}
