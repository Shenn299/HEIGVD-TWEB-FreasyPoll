'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './administer-poll-room.routes';

export class AdministerPollRoomComponent {

  // All questions from all poll-rooms
  questions = [];
  // All questions from the current poll-room 
  pollRoomQuestions = [];
  // The current poll-room
  pollRoom = {};

  /*@ngInject*/
  constructor($http, socket, $scope, pollRoomToJoin) {
    this.$http = $http;
    this.socket = socket;
    this.pollRoomToJoin = pollRoomToJoin;
    this.getPollRoomNameToJoin();
    this.getPollRoomIdToJoin();
    this.getQuestions();

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('question');
    });
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
      this.getPollRoomQuestions();
    });
  }

  getPollRoomQuestions() {
    var currentPollRoomId = this.pollRoom.id;
    this.pollRoomQuestions.splice(0, this.pollRoomQuestions.length);
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].pollRoomId == currentPollRoomId) {
        this.pollRoomQuestions.push(this.questions[i]);
      }
    }
  }

  delete(question) {
    this.$http.delete('/api/questions/' + question._id).then(response => { });
    // Remove the question from the model too
    this.pollRoomQuestions.splice(this.pollRoomQuestions.indexOf(question), 1);
  }
}

export default angular.module('heigvdTwebFreasyPollApp.administer-poll-room', [uiRouter])
  .config(routes)
  .component('administerPollRoom', {
    template: require('./administer-poll-room.html'),
    controller: AdministerPollRoomComponent,
    controllerAs: 'administerPollRoomCtrl'
  })
  .name;
