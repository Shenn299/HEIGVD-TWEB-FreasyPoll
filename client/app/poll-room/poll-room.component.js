'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './poll-room.routes';
import pollRoomToJoinService from '../poll-room-to-join/poll-room-to-join.service';

export class PollRoomComponent {

  // All questions from all poll-rooms
  questions = [];
  // All questions from the current poll-room 
  pollRoomQuestions = [];
  // The current poll-room
  pollRoom = {};
  // The total number of responses for the question
  numberOfResponses = 0;

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

  update(question) {
    // Check if question.answered is defined
    if (question.answered) {
      // Update the number of responses for this question for this response
      if (question.answered == 1) {
        this.$http.patch('/api/questions/' + question._id,
          [
	          {
	            "op": "replace",
	            "path": "/numberOfResponsesForFirstPossibilityOfResponse",
	            "value": question.numberOfResponsesForFirstPossibilityOfResponse + 1
	          }
          ]
        )
          .then(response => {
            return this.getNumberOfResponses(question._id)
              .then(response => { });
          });
      }

      else if (question.answered == 2) {
        this.$http.patch('/api/questions/' + question._id,
          [
	          {
	            "op": "replace",
	            "path": "/numberOfResponsesForSecondPossibilityOfResponse",
	            "value": question.numberOfResponsesForSecondPossibilityOfResponse + 1
	          }
          ]
        )
          .then(response => {
            return this.getNumberOfResponses(question._id)
              .then(response => { });
          });
      }

      else {
        this.$http.patch('/api/questions/' + question._id,
          [
	          {
	            "op": "replace",
	            "path": "/numberOfResponsesForThirdPossibilityOfResponse",
	            "value": question.numberOfResponsesForThirdPossibilityOfResponse + 1
	          }
          ]
        )
          .then(response => {
            return this.getNumberOfResponses(question._id)
              .then(response => {});
          });
      }

    }

  }

  // Return the total number of responses for the question
  getNumberOfResponses(questionId) {
    return this.$http.get('/api/questions/' + questionId)
      .then(response => {
        var question = response.data;
        this.numberOfResponses = question.numberOfResponsesForFirstPossibilityOfResponse
          + question.numberOfResponsesForSecondPossibilityOfResponse
          + question.numberOfResponsesForThirdPossibilityOfResponse;
      });

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
