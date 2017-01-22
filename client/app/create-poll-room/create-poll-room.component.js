'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './create-poll-room.routes';

export class CreatePollRoomComponent {

  pollRoom = {
    name: '',
    password: ''
  };

  /*@ngInject*/
  constructor($http, $state, Auth) {
    this.$http = $http;
    this.$state = $state;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  createPollRoom() {
    if (this.pollRoom.name) {
      var self = this;
      this.$http.post('/api/poll-rooms', {
        name: this.pollRoom.name,
        password: this.pollRoom.password,
        presenterId: this.getCurrentUser()._id
      })
        .then(function (response) {
          // Change the state of the router
          self.$state.go('presenter-home');
        });

      this.pollRoom.name = '';
      this.pollRoom.password = '';
    }
  }
}

export default angular.module('heigvdTwebFreasyPollApp.create-poll-room', [uiRouter])
  .config(routes)
  .component('createPollRoom', {
    template: require('./create-poll-room.html'),
    controller: CreatePollRoomComponent,
    controllerAs: 'createPollRoomCtrl'
  })
  .name;
