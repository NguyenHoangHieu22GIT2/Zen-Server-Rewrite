import { BadRequestException, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

export const convertToMongoId = <TType>({
  id,
  returnError,
}: {
  id: any;
  returnError: boolean;
}) => {
  if (typeof id === 'string' && id.length == 24) {
    return new mongoose.Types.ObjectId(id) as TType;
  }
  if (returnError) {
    throw new BadRequestException('Wrong Id Type');
  }
  return null;
};
