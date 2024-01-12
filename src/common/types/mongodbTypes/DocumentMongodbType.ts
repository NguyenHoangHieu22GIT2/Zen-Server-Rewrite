import { Document, Types } from 'mongoose';

export type DocumentMongodbType<T> = Document<unknown, {}, T> &
  T &
  Required<{
    _id: Types.ObjectId;
  }>;
