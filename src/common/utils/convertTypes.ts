import { Types } from 'mongoose';

export function convertToObjectId(value: string) {
  return value as unknown as Types.ObjectId;
}

export function convertToBooleanBasedOnStringMeaning(value: string) {
  return value === 'true' ? true : false;
}
