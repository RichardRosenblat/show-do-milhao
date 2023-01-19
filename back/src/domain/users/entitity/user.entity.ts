import { ObjectId } from 'bson';

export class User {
  _id: ObjectId;

  email: string;
  name: string;
  password: string;
  
  answered_questions: ObjectId[];
  correct_answers: number;
  errors: number;

  finished_date: Date;
  start_date: Date;

  active_question: ObjectId;

  helps_used: {
    cards: number;
    skips: number;
  };
}
