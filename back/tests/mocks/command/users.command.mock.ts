import { ObjectId } from 'bson';
import { mongoDbDocumentToUserEntity } from '../../../src/domain/users/mapper/mongoDbDocumentToUserEntity';
import { usersMockDatabase } from '../database/users.database.mock';

export const usersCommandMock = {
  findById: jest.fn((userId: string) => {
    const id = new ObjectId(userId);
    return mongoDbDocumentToUserEntity(
      usersMockDatabase.find(
        (user) => user._id.toHexString() === id.toHexString(),
      ),
    );
  }),
};
