'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  statement: String,
  firstPossibilityOfResponse: String,
  secondPossibilityOfResponse: String,
  thirdPossibilityOfResponse: String,
  numberOfResponsesForFirstPossibilityOfResponse: Number,
  // numberOfResponsesForFirstPossibilityOfResponse: { type: Number, default: '0' },
  numberOfResponsesForSecondPossibilityOfResponse: Number,
  // numberOfResponsesForSecondPossibilityOfResponse: { type: Number, default: '0' },
  numberOfResponsesForThirdPossibilityOfResponse: Number,
  // numberOfResponsesForThirdPossibilityOfResponse: { type: Number, default: '0' },
  pollRoomId: String
});

export default mongoose.model('Question', QuestionSchema);
