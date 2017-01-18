'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './poll-room.routes';
import pollRoomToJoinService from '../poll-room-to-join/poll-room-to-join.service';
import questionsAnsweredService from '../questions-answered/questions-answered.service';

export class PollRoomComponent {

  // All questions from all poll-rooms
  questions = [];
  // All questions from the current poll-room 
  pollRoomQuestions = [];
  // The current poll-room
  pollRoom = {};

  /*@ngInject*/
  constructor($http, socket, $scope, pollRoomToJoin, questionsAnswered) {
    this.$http = $http;
    this.socket = socket;
    this.pollRoomToJoin = pollRoomToJoin;
    this.questionsAnswered = questionsAnswered;
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
        if (this.questionsAnswered.hasBeenAnswered(this.questions[i]._id) == true) {
          this.questions[i].isAnswered = true;
        }
        else {
          this.questions[i].isAnswered = false;
        }
        this.pollRoomQuestions.push(this.questions[i]);
      }
    }
  }

  update(question, response) {
    var self = this;
    // Update the number of responses for this question for this response
    if (response == 1) {
      this.$http.patch('/api/questions/' + question._id,
        [
          {
            "op": "replace",
            "path": "/numberOfResponsesForFirstPossibilityOfResponse",
            "value": question.numberOfResponsesForFirstPossibilityOfResponse + 1
          }
        ]
      )
        .success(function () {
          self.questionsAnswered.addQuestionAnswered(question._id);
          self.getQuestions();
        });
    }

    else if (response == 2) {
      this.$http.patch('/api/questions/' + question._id,
        [
          {
            "op": "replace",
            "path": "/numberOfResponsesForSecondPossibilityOfResponse",
            "value": question.numberOfResponsesForSecondPossibilityOfResponse + 1
          }
        ]
      )
        .success(function () {
          self.questionsAnswered.addQuestionAnswered(question._id);
          self.getQuestions();
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
        .success(function () {
          self.questionsAnswered.addQuestionAnswered(question._id);
          self.getQuestions();
        });
    }

  }

}

export default angular.module('heigvdTwebFreasyPollApp.poll-room', [uiRouter, pollRoomToJoinService, questionsAnsweredService])
  .config(routes)
  .component('pollRoom', {
    template: require('./poll-room.html'),
    controller: PollRoomComponent,
    controllerAs: 'pollRoomCtrl'
  })
  .name;
