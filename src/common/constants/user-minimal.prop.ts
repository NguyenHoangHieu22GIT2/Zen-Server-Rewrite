import { Types } from 'mongoose';

export const UserMinimalProp = {
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  _id: { type: Types.ObjectId, required: true, ref: 'User' },
};
