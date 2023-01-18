import { ObjectId } from 'bson';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
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

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsObject()
  _id: ObjectId;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsInt()
  level: number;

  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}
