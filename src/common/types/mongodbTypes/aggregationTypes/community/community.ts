import { EndUserId, GroupId } from 'src/common/types/utilTypes/Brand';
import { PostAggregation } from '../feeds/feeds';
import { Group } from 'src/modules/community/group';

export type GroupPostAggregation = {
  groupId: GroupId;
} & PostAggregation;

export type GroupAggregation = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
} & Omit<Group, 'endUserId'>;
