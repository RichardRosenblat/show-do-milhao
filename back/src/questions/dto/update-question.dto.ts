import { CreateQuestionDto } from './create-question.dto';
import { ObjectId } from 'bson';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  ValidateNested,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsObject,
} from 'class-validator';

export class UpdateQuestionDto extends CreateQuestionDto {
  @IsOptional()
  @IsObject()
  _id: ObjectId;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsInt()
  level: number;

  @IsOptional()
  @IsString()
  hint: string;

  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Answers)
  answers: Answers[];
}

export class Answers {
  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsBoolean()
  isCorrect: boolean;
}
