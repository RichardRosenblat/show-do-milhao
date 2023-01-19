import { ObjectId } from 'bson';
import { Question } from '../entities/question.entity';

export class QuestionDTO implements Question {
  _id: ObjectId;
  text: string;
  category: string;
  level: number;
  hint: string;
  answers: { text: string; isCorrect: boolean }[];
}
