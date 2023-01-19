import { ObjectId } from 'bson';
import { Exclude, Type } from 'class-transformer';
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
  Min,
  Max,
} from 'class-validator';
import { Question } from '../entities/question.entity';

export class CreateQuestionDTO implements Question{
  @IsNotEmpty()
  @IsObject()
  @Exclude()
  _id: ObjectId = new ObjectId();

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  level: number;

  @IsNotEmpty()
  @IsString()
  hint: string;

  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDTO)
  answers: CreateAnswerDTO[];
}

export class CreateAnswerDTO {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean = false;
}
