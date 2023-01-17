import { ObjectId } from 'bson';
import { User } from '../entitity/user.entity';

export class CreateUserDTO implements User {
  email: string;
  name: string;
  password: string;

  readonly _id: ObjectId = new ObjectId();
  readonly answered_questions: ObjectId[] = [];
  readonly correct_answers: number = 0;
  readonly errors: number = 0;

  readonly finished_date: Date = null;
  readonly start_date: Date = null;

  readonly active_question: ObjectId = null;

  readonly helps_used: {
    cards: number;
    skips: number;
  } = {
    cards: 0,
    skips: 0,
  };
}
