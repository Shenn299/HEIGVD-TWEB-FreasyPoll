'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './poll-room.routes';
import pollRoomToJoinService from '../poll-room-to-join/poll-room-to-join.service';

export class PollRoomComponent {

  /*@ngInject*/
  constructor($http, pollRoomToJoin) {
    this.$http = $http;
    this.pollRoomToJoin = pollRoomToJoin;
    this.questions = [];
    this.pollRoomQuestions = [];
    this.pollRoom = {};
    this.getPollRoomNameToJoin();
    this.getPollRoomIdToJoin();
    this.getQuestions();
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
