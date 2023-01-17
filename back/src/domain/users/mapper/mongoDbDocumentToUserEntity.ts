import { Document, WithId } from 'mongodb';
import { User } from '../entitity/user.entity';

type userLike = {
  [key in keyof User]: any;
};

export function mongoDbDocumentToUserEntity(data: WithId<Document>) {
  const user = new User();
  Object.entries(data as userLike).forEach(([k, v]) => (user[k] = v));
  return user;
}
