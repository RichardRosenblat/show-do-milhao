import { Db, MongoClient } from 'mongodb';
import {
  InternalServerErrorException,
  OnApplicationShutdown,
  Injectable,
  Logger,
} from '@nestjs/common';
import { DatabaseConnection } from './database.type';

@Injectable()
export class DatabaseConnectionImplementation implements DatabaseConnection {
  private client: MongoClient;
  private connected: boolean;
  database: Db;

  get status() {
    return this.connected;
  }

  public async connect() {
    const connectionString =
      process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';
    const databaseName = process.env.DB_NAME || 'Alura-Show-Do-Milhao';

    try {
      const client = new MongoClient(connectionString);

      client.on('open', () => {
        Logger.log('Connected to MongoDb Server', 'MongoDb');
        this.connected = true;
      });

      client.on('topologyClosed', () => {
        Logger.log('Disconnecting MongoDb Server', 'MongoDb');
        this.connected = false;
      });
      this.client = await client.connect();
      this.database = this.client.db(databaseName);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Unnable to connect to given connection string ${connectionString}`,
        error,
      );
    }
  }

  public onApplicationShutdown() {
    if (this.client) {
      this.client.close();
      this.client = null;
      this.database = null;
    }
  }
}
