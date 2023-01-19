import * as dotEnv from 'dotenv';
import * as fs from 'fs';
import { Collection, Document, MongoClient } from 'mongodb';

dotEnv.config();

const questionsPath = 'src/seeders/questions.seed.json';

async function seed() {
  console.log('Connecting to mongodb');
  const { client, database } = await connectToMongo();

  console.log('Starting seed of Questions collection');
  await seedQuestions(database.collection('Questions'));

  console.log('Closing client connection');
  client.close();

  async function seedQuestions(collection: Collection<Document>) {
    console.log('Retrieving data from questions seed file');
    const seed = getData();

    console.log('Inserting data in collection');
    await collection.insertMany(seed);

    function getData() {
      const jsonFileData = fs.readFileSync(questionsPath, {
        encoding: 'utf-8',
      });
      const seed = JSON.parse(jsonFileData);
      return seed;
    }
  }

  async function connectToMongo() {
    const connectionString =
      process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';
    const databaseName = process.env.DB_NAME || 'Alura-Show-Do-Milhao';
    const client = new MongoClient(connectionString);

    await client.connect();
    const database = client.db(databaseName);
    return { database, client };
  }
}

seed();
