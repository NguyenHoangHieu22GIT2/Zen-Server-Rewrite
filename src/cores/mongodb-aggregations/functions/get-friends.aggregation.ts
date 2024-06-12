import { PipelineStage } from 'mongoose';
import { EndUserId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
export function getFriendsAggregation(
  endUserId: EndUserId,
  queryLimitSkip: QueryLimitSkip,
  optionalQuery: PipelineStage[] = [],
): PipelineStage[] {
  return [
    {
      $match: {
        endUserId: endUserId,
      },
    },
    {
      $unwind: {
        path: '$endUserIds',
      },
    },
    ...optionalQuery,
    { $skip: queryLimitSkip.skip },
    { $limit: queryLimitSkip.limit },
    {
      $lookup: {
        from: 'endusers',
        localField: 'endUserIds',
        foreignField: '_id',
        as: 'friend',
      },
    },
    {
      $unset: ['friend.password'],
    },
    {
      $group: {
        _id: null,
        friends: {
          $push: '$friend',
        },
      },
    },
  ];
}
