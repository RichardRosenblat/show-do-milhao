import { IsDateString, IsNotEmpty } from 'class-validator';

export class TimeMarkDTO {
  @IsNotEmpty()
  @IsDateString()
  time: Date;
}
