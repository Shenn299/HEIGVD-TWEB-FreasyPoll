'use strict';
const angular = require('angular');

/*@ngInject*/
export function questionsAnsweredService($window) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  // Add questionId to the tab named questionsAnswered saved in the browser local storage
  this.addQuestionAnswered = function (questionId) {
    var tab = JSON.parse($window.localStorage.getItem("questionsAnswered"));
    if (!tab) {
      tab = [];
    }
    if (this.hasBeenAnswered(questionId) == false) {
      tab.push(questionId);
      $window.localStorage.setItem('questionsAnswered', JSON.stringify(tab));
    }
  };

  // Check if question has already been answered by the client
  this.hasBeenAnswered = function (questionId) {
    var tab = JSON.parse($window.localStorage.getItem("questionsAnswered"));
    if (!tab) {
      return false;
    }
    for (var i = 0; i < tab.length; i++) {
      if (tab[i] == questionId) {
        return true;
      }
    }
    return false;
  };

}

export default angular.module('heigvdTwebFreasyPollApp.questions-answered', [])
  .service('questionsAnswered', questionsAnsweredService)
  .name;
