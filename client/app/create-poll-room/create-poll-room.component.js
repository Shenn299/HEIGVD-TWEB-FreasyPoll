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
  constructor($http, Auth) {
    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  createPollRoom() {
    if(this.pollRoom.name) {
      this.$http.post('/api/poll-rooms', {
        name: this.pollRoom.name,
        password: this.pollRoom.password,
        presenterId: this.getCurrentUser()._id
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
