import { ObjectId } from 'bson';
import { mongoDbDocumentToUserEntity } from '../../../src/domain/users/mapper/mongoDbDocumentToUserEntity';
import { userMockDatabase } from '../database/users.database.mock';

export const usersCommandMock = {
  findById: jest.fn((userId: string) => {
    const id = new ObjectId(userId);
    mongoDbDocumentToUserEntity(
      userMockDatabase.find(
        (user) => user._id.toHexString() === id.toHexString(),
      ),
    );
  }),
};
