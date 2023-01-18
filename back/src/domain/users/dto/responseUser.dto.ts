import { ObjectId } from 'bson';
import { User } from '../entitity/user.entity';

export class ResponseUserDTO implements Omit<User, 'password'> {

  _id: ObjectId;

  email: string;
  name: string;

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
