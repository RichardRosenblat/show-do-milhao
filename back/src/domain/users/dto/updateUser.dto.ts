import { ObjectId } from 'bson';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { User } from '../entitity/user.entity';

export class helpsUsed {
  @Max(3)
  @Min(0)
  @IsInt()
  cards: number;
  @Max(3)
  @Min(0)
  @IsInt()
  skips: number;
}

export class UpdateUserDTO implements Partial<User> {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @IsArray()
  @IsOptional()
  answered_questions?: ObjectId[];
  
  @IsOptional()
  @IsInt()
  correct_answers?: number;

  @IsInt()
  @IsOptional()
  @Max(3)
  errors?: number;

  @IsDate()
  @IsOptional()
  finished_date?: Date;

  @IsDate()
  @IsOptional()
  start_date?: Date;

  @IsObject()
  active_question?: ObjectId;

  @ValidateNested()
  @Type(() => helpsUsed)
  @IsOptional()
  helps_used?: helpsUsed;
}
