import { ObjectId } from 'bson';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsObject } from 'class-validator';

export class AnswerDataDTO {
  @IsNotEmpty()
  @IsObject()
  @Transform(({ value }) => new ObjectId(value))
  questionId: ObjectId;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;

  @IsNotEmpty()
  @IsObject()
  @Transform(({ value }) => new ObjectId(value))
  nextQuestion: ObjectId;
}
