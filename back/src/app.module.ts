import { Module } from '@nestjs/common';
import { InfraModule } from './database/infra.module';
import { UsersModule } from './domain/users/users.module';
import { QuestionsModule } from './domain/questions/questions.module';

@Module({
  imports: [QuestionsModule, InfraModule, UsersModule],
})
export class AppModule {}
