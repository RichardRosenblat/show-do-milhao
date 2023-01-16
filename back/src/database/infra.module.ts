import { Module, Global } from '@nestjs/common';
import { DatabaseConnection } from './database';

@Global()
@Module({
  providers: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class InfraModule {}
