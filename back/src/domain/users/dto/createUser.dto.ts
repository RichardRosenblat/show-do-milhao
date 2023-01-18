import { ObjectId } from 'bson';
import { User } from '../entitity/user.entity';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UniqueUserEmail } from '../validators/doesUserEmailAlreadyExist';

@Exclude()
export class CreateUserDTO implements User {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @UniqueUserEmail()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  _id: ObjectId = new ObjectId();
  answered_questions: ObjectId[] = [];
  correct_answers: number = 0;
  errors: number = 0;

  finished_date: Date = null;
  start_date: Date = null;

  active_question: ObjectId = null;

  helps_used: {
    cards: number;
    skips: number;
  } = {
    cards: 0,
    skips: 0,
  };
}
