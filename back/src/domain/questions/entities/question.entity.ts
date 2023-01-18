import { ObjectId } from 'bson';

export class Question {
  _id: ObjectId;
  text: string;
  category: string;
  level: number;
  hint: string;
  answers: { text: string; isCorrect: boolean }[];
}
