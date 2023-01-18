import { Injectable } from '@nestjs/common';
import { ObjectID } from 'bson';
import { Collection, Document } from 'mongodb';
import { DatabaseConnection } from '../../../database/database';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { AnsweredQuestionData } from '../types/answeredQuestionData.type';
import { User } from '../entitity/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersRepository {
  private collection: Collection<Document>;

  constructor(databaseConnection: DatabaseConnection) {
    this.collection = databaseConnection.database.collection('Users');
  }

  async listAll() {
    return plainToInstance(User, await this.collection.find().toArray());
  }

  async findById(id: ObjectID) {
    const user = await this.collection.findOne({ _id: id });
    return user && plainToInstance(User, user);
  }

  async insert(user: CreateUserDTO) {
    await this.collection.insertOne(user);
    return this.findById(user._id);
  }

  async update(id: ObjectID, user: UpdateUserDTO) {
    await this.collection.updateOne({ _id: id }, { $set: user });
    return this.findById(id);
  }

  async addAnsweredQuestion(id: ObjectID, questionData: AnsweredQuestionData) {
    const { isCorrect, questionId, nextQuestion } = questionData;

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

  async useHelp(id: ObjectID, help_used: 'cards' | 'skips') {
    const user = await this.findById(id);

    if (user.helps_used[help_used] < 3) {
      await this.collection.updateOne(
        { _id: id },
        {
          // TODO CHECK THIS, IF AN ERROR OCCURS IT MIGHT BE THE QUOTES MISSING
          $inc: { [`helps_used.${help_used}`]: 1 },
        },
      );
    }

    return this.findById(id);
  }

  async doesEmailAlreadyExist(email: string) {
    return !!(await this.collection.findOne({ email }));
  }

  async markTime(id: ObjectID, type: 'start' | 'finish', time: Date) {
    this.collection.updateOne(
      { _id: id },
      {
        $set: {
          [`${type === 'start' ? 'start' : 'finished'}_date`]: time,
        },
      },
    );
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.collection.findOne({ email, password });
    return user && plainToInstance(User, user);
  }

  async delete(id: ObjectID) {
    return (await this.collection.deleteOne({ _id: id })).deletedCount;
  }
}
