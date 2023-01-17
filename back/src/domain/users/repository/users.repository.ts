import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { plainToInstance } from 'class-transformer';
import { Collection, Document } from 'mongodb';
import { DatabaseConnection } from 'src/database/database.type';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { User } from '../entitity/user.entity';
import { AnsweredQuestionDataDTO } from '../dto/answeredQuestionData.dto';
import { instanceToPlain } from 'class-transformer';
import { HelpUsedEnum } from '../enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../enum/timeMarkType.enum';

@Injectable()
export class UsersRepository {
  private collection: Collection<Document>;

  constructor(
    @Inject('DatabaseConnection') databaseConnection: DatabaseConnection,
  ) {
    this.collection = databaseConnection.database.collection('Users');
  }

  async listAll() {
    return plainToInstance(User, await this.collection.find().toArray());
  }

  async findById(id: ObjectId) {
    const user = await this.collection.findOne({ _id: id });
    return user && plainToInstance(User, user);
  }

  async insert(user: CreateUserDTO) {
    const { insertedId } = await this.collection.insertOne(user);
    return this.findById(insertedId);
  }

  async update(id: ObjectId, user: UpdateUserDTO) {
    await this.collection.updateOne({ _id: id }, { $set: user });
    return this.findById(id);
  }

  async addAnsweredQuestion(
    id: ObjectId,
    questionData: AnsweredQuestionDataDTO,
  ) {
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

  async useHelp(id: ObjectId, help_used: HelpUsedEnum) {
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

  async markTime(id: ObjectId, type: TimeMarkTypeEnum, time: Date) {
    this.collection.updateOne(
      { _id: id },
      {
        $set: {
          [`${type}_date`]: time,
        },
      },
    );
    return this.findById(id);
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.collection.findOne({ email, password });
    return user && plainToInstance(User, user);
  }

  async delete(id: ObjectId) {
    return (await this.collection.deleteOne({ _id: id })).deletedCount;
  }
}
