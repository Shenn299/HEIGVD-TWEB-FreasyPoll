'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('administer-poll-room', {
      url: '/administer-poll-room',
      template: '<administer-poll-room></administer-poll-room>',
      authenticate: 'user'
    });
}
