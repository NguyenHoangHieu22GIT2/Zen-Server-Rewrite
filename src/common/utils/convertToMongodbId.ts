import { BadRequestException } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
import { EndUserId } from '../types/utilTypes/Brand';

export function checkToConvertToMongoIdOrThrowError<TType>({
  id,
  returnError,
}: {
  id: string | EndUserId;
  returnError: boolean;
}) {
  if (
    (typeof id === 'string' && id.toString().length == 24) ||
    Types.ObjectId.isValid(id)
  ) {
    return new mongoose.Types.ObjectId(id) as TType;
  }
  if (returnError) {
    throw new BadRequestException('Wrong Id Type');
  }
  return null;
}
