import { Document, WithId } from 'mongodb';
import { Question } from '../entities/question.entity';


type userLike = {
  [key in keyof Question]: unknown;
};

export function mongoDbDocumentToQuestionEntity(data: WithId<Document>) {
  const user = new Question();
  Object.entries(data as userLike).forEach(([k, v]) => (user[k] = v));
  return user;
}
