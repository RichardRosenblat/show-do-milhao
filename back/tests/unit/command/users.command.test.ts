import { UsersCommand } from '../../../src/domain/users/command/users.command';
import { CreateUserDTO } from '../../../src/domain/users/dto/createUser.dto';
import { HelpUsedEnum } from '../../../src/domain/users/enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../../../src/domain/users/enum/timeMarkType.enum';
import {
  resetMockUsersDatabase,
  usersMockDatabase,
} from '../../mocks/database/users.database.mock';

import { usersRepositoryMock } from '../../mocks/repository/users.mock.repository';
import { ObjectId } from 'bson';

beforeEach(() => {
  resetMockUsersDatabase();
});
describe('User command', () => {
  const command = new UsersCommand(<any>usersRepositoryMock);

  it('should list all users', async () => {
    const list = await command.listAll();
    expect(list.length).toBe(usersMockDatabase.length);
  });
  it('should insert a user', async () => {
    const userToCreate = new CreateUserDTO();

    userToCreate.email = 'test@test.com';
    userToCreate.password = '123456789';

    await command.insert(userToCreate);

    const createdUser = usersMockDatabase.find((user) => {
      return user._id.toHexString() === userToCreate._id.toHexString();
    });

    expect(createdUser).toStrictEqual(
      expect.objectContaining({
        ...userToCreate,
        password: expect.any(String),
      }),
    );
  });
  it('should update a user', async () => {
    const { _id: id } = usersMockDatabase[0];
    const updateBody = { name: 'foobar' };
    await command.update(id.toHexString(), updateBody);

    const updatedUser = usersMockDatabase.find(
      ({ _id }) => _id.toHexString() === id.toHexString(),
    );
    expect(updatedUser).toStrictEqual(expect.objectContaining(updateBody));
  });
  it('should delete a user', async () => {
    const { _id: id } = usersMockDatabase[0];
    const deleteCount = await command.delete(id.toHexString());

    expect(deleteCount).toBe(1);

    expect(usersMockDatabase[0]._id.toHexString()).not.toEqual(id);
  });
  it('should return a user by id', async () => {
    const userId = usersMockDatabase[0]._id.toHexString();
    const foundUserById = await command.findById(userId);

    expect(foundUserById).toStrictEqual(
      expect.objectContaining(usersMockDatabase[0]),
    );
  });

  it('should add an answer to an user by id', async () => {
    const userId = usersMockDatabase[0]._id.toHexString();
    const question1 = new ObjectId();
    const question2 = new ObjectId();
    const question3 = new ObjectId();

    await command.addAnsweredQuestion(userId, {
      isCorrect: true,
      questionId: question1,
      nextQuestion: question2,
    });
    await command.addAnsweredQuestion(userId, {
      isCorrect: false,
      questionId: question2,
      nextQuestion: question3,
    });

    expect(usersMockDatabase[0]).toStrictEqual(
      expect.objectContaining({
        answered_questions: [question1, question2],
        active_question: question3,
        errors: 1,
        correct_answers: 1,
      }),
    );
  });
  it('should mark the helps used by user', async () => {
    const userId = usersMockDatabase[0]._id.toHexString();

    await command.useHelp(userId, 'cards');
    await command.useHelp(userId, 'skips');

    expect(usersMockDatabase[0]).toStrictEqual(
      expect.objectContaining({
        helps_used: {
          cards: 1,
          skips: 1,
        },
      }),
    );
  });
  it('should mark time of a user by id', async () => {
    const userId = usersMockDatabase[0]._id.toHexString();
    const date1 = new Date(new Date('1-20-2022'));
    const date2 = new Date(new Date('1-21-2022'));

    
    await command.markTime(userId, 'start', date1);
    await command.markTime(userId, 'finish', date2);


    expect(usersMockDatabase[0]).toStrictEqual(
      expect.objectContaining({ start_date: date1, finished_date: date2 }),
    );
  });
  it('should find user by email', async () => {
    const { email } = usersMockDatabase[0];

    const foundUser = await command.findByEmail(email);

    expect(foundUser).toStrictEqual(
      expect.objectContaining(usersMockDatabase[0]),
    );
  });
});
