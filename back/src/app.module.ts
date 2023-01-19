import { Module } from '@nestjs/common';
import { InfraModule } from './database/infra.module';
import { UsersModule } from './domain/users/users.module';
import { QuestionsModule } from './domain/questions/questions.module';
import { AuthModule } from './domain/auth/auth.module';

@Module({
  imports: [QuestionsModule, InfraModule, UsersModule, AuthModule],
})
export class AppModule {}
