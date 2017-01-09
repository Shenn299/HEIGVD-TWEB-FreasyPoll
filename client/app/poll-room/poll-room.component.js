'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './poll-room.routes';
import pollRoomToJoinService from '../poll-room-to-join/poll-room-to-join.service';

export class PollRoomComponent {

  questions = [];
  pollRoomQuestions = [];
  pollRoom = {};
  response = '';

  /*@ngInject*/
  constructor($http, socket, $scope, pollRoomToJoin) {
    this.$http = $http;
    this.socket = socket;
    this.pollRoomToJoin = pollRoomToJoin;
    this.getPollRoomNameToJoin();
    this.getPollRoomIdToJoin();
  }

  $onInit() {
    this.getQuestions();
    this.socket.syncUpdates('question', this.pollRoomQuestions);
  }

  getPollRoomNameToJoin() {
    this.pollRoom.name = this.pollRoomToJoin.getPollRoomNameToJoin();
  }

  getPollRoomIdToJoin() {
    this.pollRoom.id = this.pollRoomToJoin.getPollRoomIdToJoin();
  }

  getQuestions() {
    this.$http.get('/api/questions').then(response => {
      this.questions = response.data;
      this.getpollRoomQuestions();
    });
  }

  getpollRoomQuestions() {
    var pollRoomId = this.pollRoom.id;
    this.pollRoomQuestions.splice(0, this.pollRoomQuestions.length);
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].pollRoomId == pollRoomId) {
        this.pollRoomQuestions.push(this.questions[i]);
      }
    }
  }

}

export default angular.module('heigvdTwebFreasyPollApp.poll-room', [uiRouter, pollRoomToJoinService])
  .config(routes)
  .component('pollRoom', {
    template: require('./poll-room.html'),
    controller: PollRoomComponent,
    controllerAs: 'pollRoomCtrl'
  })
  .name;
