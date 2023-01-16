import { Module } from '@nestjs/common';
import { InfraModule } from './database/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
