import { mongoDbDocumentToQuestionEntity } from '../../../src/domain/questions/mappers/mongoDbDocumentToUserEntity';
import { questionsMockDatabase } from '../database/questions.database.mock';
import { ObjectId } from 'bson';
import { CreateQuestionDTO } from '../../../src/domain/questions/dto/createQuestion.dto';
import { UpdateQuestionDTO } from '../../../src/domain/questions/dto/updateQuestion.dto';

export const questionsRepositoryMock = {
  listAll: jest.fn(async () => {
    return questionsMockDatabase.map((question) =>
      mongoDbDocumentToQuestionEntity(question),
    );
  }),
  listByLevel: jest.fn(async (levelToSearch: number) => {
    return questionsMockDatabase
      .filter(({ level }) => level === levelToSearch)
      .map((question) => mongoDbDocumentToQuestionEntity(question));
  }),
  findById: jest.fn(async (id: ObjectId) => {
    return mongoDbDocumentToQuestionEntity(
      questionsMockDatabase.find(
        ({ _id }) => _id.toHexString() === id.toHexString(),
      ),
    );
  }),
  insert: jest.fn(async (question: CreateQuestionDTO) => {
    const insertObj = {
      ...question,
      answers: question.answers.map((answer) => ({ ...answer })),
    };
    questionsMockDatabase.push(insertObj);
    return mongoDbDocumentToQuestionEntity(insertObj);
  }),
  update: jest.fn(async (id: ObjectId, body: UpdateQuestionDTO) => {
    const index = questionsMockDatabase.findIndex(
      ({ _id }) => _id.toHexString() === id.toHexString(),
    );

    const parsedAnswers = body.answers
      ? { answers: body.answers.map((answer) => ({ ...answer })) }
      : {};
    const parsedBody = { ...body, ...parsedAnswers };

    questionsMockDatabase[index] = {
      ...questionsMockDatabase[index],
      ...{ ...parsedBody },
    };
    return mongoDbDocumentToQuestionEntity(questionsMockDatabase[index]);
  }),
  delete: jest.fn(async (id: ObjectId) => {
    const index = questionsMockDatabase.findIndex(
      ({ _id }) => _id.toHexString() === id.toHexString(),
    );
    questionsMockDatabase.splice(index, 1);
    return 1;
  }),
};
