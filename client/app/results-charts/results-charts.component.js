'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './results-charts.routes';

export class ResultsChartsComponent {

  labels = ["A", "B", "C"];
  colors = ["#FF0000", "#00FF00", "#2E2EFE"];

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
      this.getPollRoomQuestions();
    });
  }

  getPollRoomQuestions() {
    var pollRoomId = this.pollRoom.id;
    this.pollRoomQuestions.splice(0, this.pollRoomQuestions.length);
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].pollRoomId == pollRoomId) {
        this.pollRoomQuestions.push(this.questions[i]);
      }
    }
  }

}

export default angular.module('heigvdTwebFreasyPollApp.results-charts', [uiRouter])
  .config(routes)
  .component('resultsCharts', {
    template: require('./results-charts.html'),
    controller: ResultsChartsComponent,
    controllerAs: 'resultsChartsCtrl'
  })
  .name;
