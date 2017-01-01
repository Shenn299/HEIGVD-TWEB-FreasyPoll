/**
 * PollRoom model events
 */

'use strict';

import {EventEmitter} from 'events';
import PollRoom from './poll-room.model';
var PollRoomEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PollRoomEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  PollRoom.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PollRoomEvents.emit(event + ':' + doc._id, doc);
    PollRoomEvents.emit(event, doc);
  };
}

export default PollRoomEvents;
