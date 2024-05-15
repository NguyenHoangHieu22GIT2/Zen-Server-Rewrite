import { PipelineStage } from 'mongoose';
import { nameOfCollections } from '../../../common/constants/name-of-collections';

export const LookUpEndUserAggregate: PipelineStage[] = [
  {
    $lookup: {
      from: nameOfCollections.EndUser,
      localField: 'endUserId',
      foreignField: '_id',
      as: 'userFull',
    },
  },
  {
    $unwind: '$userFull',
  },
  {
    $set: {
      endUser: {
        _id: '$userFull._id',
        username: '$userFull.username',
        avatar: '$userFull.avatar',
      },
    },
  },
  {
    $unset: ['userFull'],
  },
] as const;
