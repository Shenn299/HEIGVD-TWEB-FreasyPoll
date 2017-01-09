'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './administer-poll-room.routes';
import currentPollRoomService from '../current-poll-room/current-poll-room.service';

export class AdministerPollRoomComponent {

  /*@ngInject*/
  constructor($http, socket, $scope, currentPollRoom) {
    this.$http = $http;
    this.socket = socket;
    this.currentPollRoom = currentPollRoom;
    this.questions = [];
    this.currentPollRoomQuestions = [];
    this.getCurrentPollRoom();
    this.getQuestions();

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('question');
    });
  }

  getCurrentPollRoom() {
    this.pollRoom = this.currentPollRoom.getCurrentPollRoom();
  }

  getQuestions() {
    this.$http.get('/api/questions').then(response => {
      this.questions = response.data;
      this.getCurrentPollRoomQuestions();
    });
  }

  getCurrentPollRoomQuestions() {
    var currentPollRoomId = this.pollRoom._id;
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].pollRoomId == currentPollRoomId) {
        this.currentPollRoomQuestions.push(this.questions[i]);
      }
    }
  }

  delete(question) {
    this.$http.delete('/api/questions/' + question._id).then(response => { });
    // Remove the question from the model too
    this.currentPollRoomQuestions.splice(this.currentPollRoomQuestions.indexOf(question), 1);
  }
}

export default angular.module('heigvdTwebFreasyPollApp.administer-poll-room', [uiRouter, currentPollRoomService])
  .config(routes)
  .component('administerPollRoom', {
    template: require('./administer-poll-room.html'),
    controller: AdministerPollRoomComponent,
    controllerAs: 'administerPollRoomCtrl'
  })
  .name;
