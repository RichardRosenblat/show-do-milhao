import { ObjectId } from 'bson';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsObject } from 'class-validator';
import { isExistingQuestion } from '../../questions/validator/doesQuestionExists';
import { transformStringToObjectId } from '../../../util/ObjectIdTranform';

export class AnswerDataDTO {
  @IsNotEmpty()
  @IsObject()
  @Transform(transformStringToObjectId)
  @isExistingQuestion()
  questionId: ObjectId;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;

  @IsNotEmpty()
  @IsObject()
  @Transform(transformStringToObjectId)
  @isExistingQuestion()
  nextQuestion: ObjectId;
}

