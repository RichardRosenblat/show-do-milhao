import { ObjectID } from 'bson';

export interface AnsweredQuestionData {
  questionId: ObjectID;
  isCorrect: boolean;
  nextQuestion: ObjectID;
}
