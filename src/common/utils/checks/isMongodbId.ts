import { isMongoId } from 'class-validator';
import { Types } from 'mongoose';

export function isMongodbId(id: unknown): id is Types.ObjectId {
  return isMongoId(id);
}
