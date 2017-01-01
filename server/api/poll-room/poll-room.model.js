'use strict';

import mongoose from 'mongoose';

var PollRoomSchema = new mongoose.Schema({
  name: String,
  password: String,
  presenterId: String
});

export default mongoose.model('PollRoom', PollRoomSchema);
