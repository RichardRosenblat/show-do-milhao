import { Module } from '@nestjs/common';
import { InfraModule } from './database/infra.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [QuestionsModule, InfraModule],
})
export class AppModule {}
