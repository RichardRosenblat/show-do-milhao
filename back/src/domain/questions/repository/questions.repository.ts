import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDTO } from '../dto/createQuestion.dto';
import { UpdateQuestionDTO } from '../dto/updateQuestion.dto';
import { ObjectId } from 'bson';
import { WithId, Document, Collection } from 'mongodb';
import { Question } from '../entities/question.entity';
import { mongoDbDocumentToQuestionEntity } from '../mappers/mongoDbDocumentToUserEntity';
import { DatabaseConnection } from '../../../database/database.type';

@Injectable()
export class QuestionsRepository {
  
  collection: Collection<Document>;

  constructor(
    @Inject('DatabaseConnection') databaseConnection: DatabaseConnection,
  ) {
    this.collection = databaseConnection.database.collection('Questions');
  }

  async listAll() {
    const questions = await this.collection.find().toArray();
    return this.convertToEntity(questions);
  }

  async listByLevel(level: number) {
    const questions = await this.collection.find({ level }).toArray();
    return this.convertToEntity(questions)
  }

  async findById(id: ObjectId) {
    const question = await this.collection.findOne({ _id: id });
    return question && this.convertToEntity(question);
  }

  async insert(question: CreateQuestionDTO) {
    const { insertedId } = await this.collection.insertOne(question);

    return this.findById(insertedId);
  }

  async update(id: ObjectId, question: UpdateQuestionDTO) {
    await this.collection.updateOne({ _id: id }, { $set: question });

    return this.findById(id);
  }

  async delete(id: ObjectId) {
    return (await this.collection.deleteOne({ _id: id })).deletedCount;
  }

  private convertToEntity(data: WithId<Document>): Question;
  private convertToEntity(data: WithId<Document>[]): Question[];
  private convertToEntity(data: any) {
    if (Array.isArray(data)) {
      return data.map((user) => mongoDbDocumentToQuestionEntity(user));
    }
    return mongoDbDocumentToQuestionEntity(data);
  }
}
