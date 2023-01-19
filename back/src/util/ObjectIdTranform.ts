import { ObjectId } from 'bson';

export const transformStringToObjectId = ({ value }) =>
  typeof value === 'string' && ObjectId.isValid(value)
    ? new ObjectId(value)
    : new ObjectId();

export const transformStringArrayToObjectIdArray = ({ value }) =>
  value.map((id: string) => transformStringToObjectId({ value: id }));
