import { Module } from '@nestjs/common';
import { QuestionsService } from './repository/questions.service';
import { QuestionsController } from './controller/questions.controller';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
