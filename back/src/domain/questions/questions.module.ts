import { Module, forwardRef } from '@nestjs/common';
import { QuestionsRepository } from './repository/questions.repository';
import { QuestionsController } from './controller/questions.controller';
import { QuestionsCommand } from './command/questions.command';
import { UsersModule } from '../users/users.module';
import { doesQuestionExists } from './validator/doesQuestionExists';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsCommand, QuestionsRepository, doesQuestionExists],
  imports: [forwardRef(() => UsersModule)],
  exports: [doesQuestionExists],
})
export class QuestionsModule {}
