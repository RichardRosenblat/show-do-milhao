import { ObjectId } from 'bson';
import { AnswerDataDTO } from '../../../src/domain/users/dto/answerData.dto';
import { CreateUserDTO } from '../../../src/domain/users/dto/createUser.dto';
import { UpdateUserDTO } from '../../../src/domain/users/dto/updateUser.dto';
import { mongoDbDocumentToUserEntity } from '../../../src/domain/users/mapper/mongoDbDocumentToUserEntity';
import { usersMockDatabase } from '../database/users.database.mock';
import { HelpUsedEnum } from '../../../src/domain/users/enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../../../src/domain/users/enum/timeMarkType.enum';

export const usersRepositoryMock = {
  listAll: jest.fn(async () => {
    return usersMockDatabase.map((user) => mongoDbDocumentToUserEntity(user));
  }),
  findById: jest.fn(async (id: ObjectId) => {
    return mongoDbDocumentToUserEntity(
      usersMockDatabase.find(
        ({ _id }) => _id.toHexString() === id.toHexString(),
      ),
    );
  }),
  insert: jest.fn(async (user: CreateUserDTO) => {
    const insertObj = {
      ...user,
      helps_used: { ...user.helps_used },
    };
    usersMockDatabase.push(insertObj);
    return mongoDbDocumentToUserEntity(insertObj);
  }),
  update: jest.fn(async (id: ObjectId, body: UpdateUserDTO) => {
    const index = usersMockDatabase.findIndex(
      ({ _id }) => _id.toHexString() === id.toHexString(),
    );

    const parsedHelps: { helps_used?: { cards: number; skips: number } } =
      body.helps_used ? { helps_used: { ...body.helps_used } } : {};
    const parsedBody = { ...body };

    usersMockDatabase[index] = {
      ...usersMockDatabase[index],
      ...{ ...parsedBody, ...parsedHelps },
    };
    return mongoDbDocumentToUserEntity(usersMockDatabase[index]);
  }),
  delete: jest.fn(async (id: ObjectId) => {
    const index = usersMockDatabase.findIndex(
      ({ _id }) => _id.toHexString() === id.toHexString(),
    );
    usersMockDatabase.splice(index, 1);
    return 1;
  }),

  addAnsweredQuestion: jest.fn(
    async (
      id: ObjectId,
      { isCorrect, nextQuestion, questionId }: AnswerDataDTO,
    ) => {
      const userIndex = usersMockDatabase.findIndex(
        ({ _id }) => _id.toHexString() === id.toHexString(),
      );
      const user = usersMockDatabase[userIndex];

      user.answered_questions.push(questionId);
      user.active_question = nextQuestion;
      if (isCorrect) {
        user.correct_answers++;
      } else {
        user.errors++;
      }
      usersMockDatabase[userIndex] = user;

      return mongoDbDocumentToUserEntity(usersMockDatabase[userIndex]);
    },
  ),
  useHelp: jest.fn(async (id: ObjectId, help_used: HelpUsedEnum) => {
    const userIndex = usersMockDatabase.findIndex(
      ({ _id }) => _id.toHexString() === id.toHexString(),
    );
    const user = usersMockDatabase[userIndex];

    user.helps_used[help_used]++;

    usersMockDatabase[userIndex] = user;
    return mongoDbDocumentToUserEntity(usersMockDatabase[userIndex]);
  }),
  markTime: jest.fn(
    async (id: ObjectId, type: TimeMarkTypeEnum, time: Date) => {
      const userIndex = usersMockDatabase.findIndex(
        ({ _id }) => _id.toHexString() === id.toHexString(),
      );
      const user = usersMockDatabase[userIndex];

      user[type] = time;

      usersMockDatabase[userIndex] = user;
      
      return mongoDbDocumentToUserEntity(usersMockDatabase[userIndex]);
    },
  ),
  findByEmail: jest.fn(async (email: string) => {
    const userIndex = usersMockDatabase.findIndex(
      (user) => user.email === email,
    );
    const user = usersMockDatabase[userIndex];
    return mongoDbDocumentToUserEntity(user);
  }),
};
