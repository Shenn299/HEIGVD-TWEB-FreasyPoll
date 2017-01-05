'use strict';
const angular = require('angular');

/*@ngInject*/
export function currentPollRoomService() {
   // AngularJS will instantiate a singleton by calling "new" on this function

   this.currentPollRoom = '';
   
   this.setCurrentPollRoom = function(pollRoom) {
      this.currentPollRoom = pollRoom;
   };
    
   this.getCurrentPollRoom = function() {
      return this.currentPollRoom;
   }
}

export default angular.module('heigvdTwebFreasyPollApp.current-poll-room', [])
  .service('currentPollRoom', currentPollRoomService)
  .name;
