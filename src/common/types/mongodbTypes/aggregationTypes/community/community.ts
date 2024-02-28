import { EndUserId, GroupId } from 'src/common/types/utilTypes/Brand';
import { PostAggregation } from '../feeds/feeds';
import { Group } from 'src/modules/community/group';
import { Event } from 'src/modules/community/event';

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

export type EventAggregation = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
} & Omit<Event, 'endUserId'>;
