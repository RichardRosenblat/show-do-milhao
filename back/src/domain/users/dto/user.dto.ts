import { ObjectId } from 'bson';
import { User } from '../entitity/user.entity';

export class UserDTO implements User {

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
