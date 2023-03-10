import { Inject, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { ObjectId } from 'bson';
import { Collection, Document, WithId } from 'mongodb';
import { DatabaseConnection } from '../../../database/database.type';
import { AnswerDataDTO } from '../dto/answerData.dto';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { User } from '../entitity/user.entity';
import { HelpUsedEnum } from '../enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../enum/timeMarkType.enum';
import { mongoDbDocumentToUserEntity } from '../mapper/mongoDbDocumentToUserEntity';

@Injectable()
export class UsersRepository {
  private collection: Collection<Document>;

  constructor(
    @Inject('DatabaseConnection') databaseConnection: DatabaseConnection,
  ) {
    this.collection = databaseConnection.database.collection('Users');
  }

  async listAll() {
    const users = await this.collection.find().toArray();
    return this.convertToEntity(users);
  }
  async findById(id: ObjectId) {
    const user = await this.collection.findOne({ _id: id });
    return user && this.convertToEntity(user);
  }
  async insert(user: CreateUserDTO) {
    const { password } = user;
    const hashedPassword = hashSync(password, 10);

    const { insertedId } = await this.collection.insertOne({
      ...user,
      password: hashedPassword,
    });

    return this.findById(insertedId);
  }
  async update(id: ObjectId, user: UpdateUserDTO) {
    const { password } = user;

    const hashedPasswordObj = password
      ? { password: hashSync(password, 10) }
      : {};

    await this.collection.updateOne(
      { _id: id },
      { $set: { ...user, ...hashedPasswordObj } },
    );

    return this.findById(id);
  }
  async delete(id: ObjectId) {
    return (await this.collection.deleteOne({ _id: id })).deletedCount;
  }

  async addAnsweredQuestion(id: ObjectId, answerData: AnswerDataDTO) {
    const { isCorrect, questionId, nextQuestion } = answerData;

    await this.collection.updateOne(
      { _id: id },
      {
        $push: { answered_questions: questionId },
        $inc: { correct_answers: isCorrect ? 1 : 0, errors: isCorrect ? 0 : 1 },
        $set: { active_question: nextQuestion },
      },
    );

    return this.findById(id);
  }
  async useHelp(id: ObjectId, help_used: HelpUsedEnum) {
    await this.collection.updateOne(
      { _id: id },
      {
        $inc: { [`helps_used.${help_used}`]: 1 },
      },
    );

    return this.findById(id);
  }

  async doesEmailAlreadyExist(email: string) {
    const user = await this.collection.findOne({ email });
    return !!user;
  }
  async markTime(id: ObjectId, type: TimeMarkTypeEnum, time: Date) {
    await this.collection.updateOne(
      { _id: id },
      {
        $set: {
          [type]: time,
        },
      },
    );
    return this.findById(id);
  }
  async findByEmail(email: string) {
    const user = await this.collection.findOne({ email });
    return user && this.convertToEntity(user);
  }

  private convertToEntity(data: WithId<Document>): User;
  private convertToEntity(data: WithId<Document>[]): User[];
  private convertToEntity(data: any) {
    if (Array.isArray(data)) {
      return data.map((user) => mongoDbDocumentToUserEntity(user));
    }
    return mongoDbDocumentToUserEntity(data);
  }
}
