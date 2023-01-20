import { QuestionsCommand } from '../../../src/domain/questions/command/questions.command';
import { CreateQuestionDTO } from '../../../src/domain/questions/dto/createQuestion.dto';
import { usersCommandMock } from '../../mocks/command/users.command.mock';
import {
  questionsMockDatabase,
  resetMockQuestionsDatabase,
} from '../../mocks/database/questions.database.mock';
import { usersMockDatabase } from '../../mocks/database/users.database.mock';
import { questionsRepositoryMock } from '../../mocks/repository/questions.mock.repository';

beforeEach(() => {
  resetMockQuestionsDatabase();
});
describe('Questions command', () => {
  const command = new QuestionsCommand(
    <any>questionsRepositoryMock,
    <any>usersCommandMock,
  );

  it('should list all questions', async () => {
    const list = await command.listAll();
    expect(list.length).toBe(questionsMockDatabase.length);
  });
  it('should insert a question', async () => {
    const questionToCreate = new CreateQuestionDTO();
    questionToCreate.text = 'string';
    questionToCreate.category = 'string';
    questionToCreate.level = 10;
    questionToCreate.hint = 'string';
    questionToCreate.answers = [
      { isCorrect: true, text: 'string' },
      { isCorrect: false, text: 'string' },
      { isCorrect: false, text: 'string' },
      { isCorrect: false, text: 'string' },
    ];

    await command.insert(questionToCreate);

    const createdQuestion = questionsMockDatabase.find((question) => {
      return (
        question.text === questionToCreate.text &&
        question.category === questionToCreate.category &&
        question.level === questionToCreate.level &&
        question.hint === questionToCreate.hint &&
        question.answers.reduce((result, { isCorrect, text }, index) => {
          const questionToCreateAnswer = questionToCreate.answers[index];

          return (
            result &&
            questionToCreateAnswer.isCorrect === isCorrect &&
            questionToCreateAnswer.text === text
          );
        }, true)
      );
    });

    expect(createdQuestion).toStrictEqual(
      expect.objectContaining(questionToCreate),
    );
  });
  it('should update a question', async () => {
    const { _id: id } = questionsMockDatabase[0];
    const updateBody = { text: 'foobar' };
    await command.update(id.toHexString(), updateBody);

    const updatedQuestion = questionsMockDatabase.find(
      ({ _id }) => _id.toHexString() === id.toHexString(),
    );
    expect(updatedQuestion).toStrictEqual(expect.objectContaining(updateBody));
  });
  it('should delete a question', async () => {
    const { _id: id } = questionsMockDatabase[0];
    const deleteCount = await command.delete(id.toHexString());

    expect(deleteCount).toBe(1);

    expect(questionsMockDatabase[0]._id.toHexString()).not.toEqual(id);
  });
  it('should return a question by id', async () => {
    const questionId = questionsMockDatabase[0]._id.toHexString();
    const foundQuestionById = await command.findById(questionId);

    expect(foundQuestionById).toStrictEqual(
      expect.objectContaining(questionsMockDatabase[0]),
    );
  });
  it('should return an random question of a given level', async () => {
    const chosenLevel = questionsMockDatabase[0].level;
    
    const levelArray = [];
    const expectedArray = [];

    for (let i = 0; i < 5; i++) {
      const randomQuestion = await command.randomByLevel(
        chosenLevel,
        usersMockDatabase[0]._id.toHexString(),
      );
      levelArray.push(randomQuestion.level);
      expectedArray.push(chosenLevel)
    }

    expect(levelArray).toStrictEqual(expectedArray)
  });
});
