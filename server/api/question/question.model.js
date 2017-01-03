'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  statement: String,
  firstPossibilityOfResponse: String,
  secondPossibilityOfResponse: String,
  thirdPossibilityOfResponse: String,
  pollRoomId: String
});

export default mongoose.model('Question', QuestionSchema);
