import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { Collection, Document, WithId } from 'mongodb';
import { DatabaseConnection } from 'src/database/database.type';
import { AnsweredQuestionDataDTO } from '../dto/answeredQuestionData.dto';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { HelpUsedEnum } from '../enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../enum/timeMarkType.enum';
import { mongoDbDocumentToUserEntity } from '../mapper/mongoDbDocumentToUserEntity';
import { User } from '../entitity/user.entity';
import { hashSync } from 'bcrypt';

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

    const hashedPassword = password ? hashSync(password, 10) : password;

    await this.collection.updateOne(
      { _id: id },
      { $set: { ...user, password: hashedPassword } },
    );
    
    return this.findById(id);
  }
  async delete(id: ObjectId) {
    return (await this.collection.deleteOne({ _id: id })).deletedCount;
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
    const user = await this.collection.findOne({ email });
    return !!user;
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
