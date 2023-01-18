import { OnApplicationShutdown } from '@nestjs/common';
import { Db } from 'mongodb';
export interface DatabaseConnection extends OnApplicationShutdown {
  database: Db;
  connect(): Promise<void>;
  get status(): boolean;
}
