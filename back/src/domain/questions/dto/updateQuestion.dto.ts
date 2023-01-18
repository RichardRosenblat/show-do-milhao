import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Question } from '../entities/question.entity';

export class UpdateQuestionDTO implements Partial<Question> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  level?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  hint?: string;

  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswer)
  @IsOptional()
  answers?: UpdateAnswer[];
}

export class UpdateAnswer {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}
