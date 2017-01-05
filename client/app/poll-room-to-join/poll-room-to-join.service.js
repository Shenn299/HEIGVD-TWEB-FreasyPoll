'use strict';
const angular = require('angular');

/*@ngInject*/
export function pollRoomToJoinService($window) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  this.setPollRoomToJoin = function (pollRoom) {
    //this.pollRoomToJoin = pollRoom;
    $window.localStorage.setItem('pollRoomId', pollRoom._id);
    $window.localStorage.setItem('pollRoomName', pollRoom.name);
  };

  this.getPollRoomNameToJoin = function () {
    //return this.pollRoomToJoin;
    return $window.localStorage.getItem('pollRoomName');
  }

  this.getPollRoomIdToJoin = function () {
    //return this.pollRoomToJoin;
    return $window.localStorage.getItem('pollRoomId');
  }
}

export default angular.module('heigvdTwebFreasyPollApp.poll-room-to-join', [])
  .service('pollRoomToJoin', pollRoomToJoinService)
  .name;
