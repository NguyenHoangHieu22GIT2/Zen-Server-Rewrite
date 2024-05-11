import { Types } from 'mongoose';

export function isIdsEqual(id1: Types.ObjectId, id2: Types.ObjectId) {
  return id1.toString() === id2.toString();
}
