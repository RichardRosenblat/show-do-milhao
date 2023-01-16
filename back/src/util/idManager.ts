import { ObjectIdLike, ObjectId } from 'bson';

type compatibleBsonTypes =
  | string
  | number
  | ObjectId
  | ObjectIdLike
  | Buffer
  | Uint8Array;

export function getId(uuid: compatibleBsonTypes) {
  return new ObjectId(uuid);
}

export function isValidId(uuid: compatibleBsonTypes) {
  return ObjectId.isValid(uuid);
}
