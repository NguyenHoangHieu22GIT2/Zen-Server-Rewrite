import { Types } from 'mongoose';
import { nameOfCollections } from './name-of-collections';

export const UserMinimalPropDeprecated = {
  _id: { type: Types.ObjectId, required: true, ref: nameOfCollections.EndUser },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
} as const;
