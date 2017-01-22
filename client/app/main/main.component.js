import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import pollRoomToJoinService from '../poll-room-to-join/poll-room-to-join.service';

export class MainController {

  awesomeThings = [];
  newThing = '';
  pollRooms = [];
  pollRoomName = '';
  pollRoomPassword = '';
  incorrectCredentialsErrorMessage = '';

  /*@ngInject*/
  constructor($http, $scope, $state, socket, pollRoomToJoin) {
    this.$http = $http;
    this.$state = $state;
    this.socket = socket;
    this.pollRoomToJoin = pollRoomToJoin;
  }

  joinPollRoom() {
    if (this.pollRoomName) {
      // Get all poll rooms
      this.$http.get('/api/poll-rooms').then(response => {
        this.pollRooms = response.data;
        for (var i = 0; i < this.pollRooms.length; ++i) {
          if (this.pollRooms[i].name == this.pollRoomName && this.pollRooms[i].password == this.pollRoomPassword) {
            // Get the right poll room
            this.pollRoomToJoin.setPollRoomToJoin(this.pollRooms[i]);
            // Change the state of the router
            this.$state.go('poll-room');
            return;
          }
        }
        this.incorrectCredentialsErrorMessage = "Poll room name or/and password are incorrect !";
      });
    }
    else {
      this.incorrectCredentialsErrorMessage = "Poll room name is required !";
    }
  }

}

export default angular.module('heigvdTwebFreasyPollApp.main', [uiRouter, pollRoomToJoinService])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
