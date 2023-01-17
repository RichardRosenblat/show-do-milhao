import { Module } from '@nestjs/common';
import { InfraModule } from './database/infra.module';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [InfraModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
