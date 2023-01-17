import { ObjectId } from 'bson';

export class AnsweredQuestionDataDTO {
  questionId: ObjectId;
  isCorrect: boolean;
  nextQuestion: ObjectId;
}
