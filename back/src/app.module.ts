import { Module } from '@nestjs/common';
<<<<<<< Updated upstream
import { InfraModule } from './database/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> Stashed changes
})
export class AppModule {}
