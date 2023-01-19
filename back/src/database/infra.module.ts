import { Module, Global } from '@nestjs/common';
import { DatabaseConnectionImplementation } from './database';
import { DatabaseConnection } from './database.type';

@Global()
@Module({
  providers: [
    DatabaseConnectionImplementation,
    {
      provide: 'DatabaseConnection',
      useFactory: async (databaseConnection: DatabaseConnection) => {
        await databaseConnection.connect();
        return databaseConnection;
      },
      inject: [DatabaseConnectionImplementation],
    },
  ],
  exports: ['DatabaseConnection'],
})
export class InfraModule {}
