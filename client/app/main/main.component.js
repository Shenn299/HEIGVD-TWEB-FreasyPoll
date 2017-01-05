import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import pollRoomToJoinService from '../poll-room-to-join/poll-room-to-join.service';

export class MainController {
  awesomeThings = [];
  newThing = '';
  pollRooms = [];
  pollRoomName = '';

  /*@ngInject*/
  constructor($http, $scope, $state, socket, pollRoomToJoin) {
    this.$http = $http;
    this.$state = $state;
    this.socket = socket;
    this.pollRoomToJoin = pollRoomToJoin;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

  joinPollRoom() {
    if (this.pollRoomName) {
      //this.pollRoomToJoin.setPollRoomToJoin(this.pollRoomName);
      this.$http.get('/api/poll-rooms').then(response => {
        this.pollRooms = response.data;
        for (var i = 0; i < this.pollRooms.length; ++i) {
          if (this.pollRooms[i].name == this.pollRoomName) {
            this.pollRoomToJoin.setPollRoomToJoin(this.pollRooms[i]);
            this.$state.go('poll-room');
            return;
          }
        }
      });
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
