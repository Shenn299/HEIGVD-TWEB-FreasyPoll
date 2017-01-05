'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('poll-room', {
      url: '/poll-room',
      template: '<poll-room></poll-room>'
    });
}
