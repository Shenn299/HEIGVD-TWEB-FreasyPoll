'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './create-question.routes';
import currentPollRoomService from '../current-poll-room/current-poll-room.service';

export class CreateQuestionComponent {

  question = {
    statement: '',
    firstPossibilityOfResponse: '',
    secondPossibilityOfResponse: '',
    thirdPossibilityOfResponse: '',
  };

  pollRoom = {};

  /*@ngInject*/
  constructor($http, pollRoomToJoin) {
    this.$http = $http;
    this.pollRoomToJoin = pollRoomToJoin;
    this.getPollRoomId();
  }

  getPollRoomId() {
    this.pollRoom.id = this.pollRoomToJoin.getPollRoomIdToJoin();
  }

  createQuestion() {
    if (this.question.statement) {
      this.$http.post('/api/questions', {
        statement: this.question.statement,
        firstPossibilityOfResponse: this.question.firstPossibilityOfResponse,
        secondPossibilityOfResponse: this.question.secondPossibilityOfResponse,
        thirdPossibilityOfResponse: this.question.thirdPossibilityOfResponse,
        pollRoomId: this.pollRoom.id,
        numberOfResponsesForFirstPossibilityOfResponse: '0',
        numberOfResponsesForSecondPossibilityOfResponse: '0',
        numberOfResponsesForThirdPossibilityOfResponse: '0'
      });
      this.question.statement = '';
      this.question.firstPossibilityOfResponse = '';
      this.question.secondPossibilityOfResponse = '';
      this.question.thirdPossibilityOfResponse = '';
    }
  }
}

export default angular.module('heigvdTwebFreasyPollApp.create-question', [uiRouter, currentPollRoomService])
  .config(routes)
  .component('createQuestion', {
    template: require('./create-question.html'),
    controller: CreateQuestionComponent,
    controllerAs: 'createQuestionCtrl'
  })
  .name;
