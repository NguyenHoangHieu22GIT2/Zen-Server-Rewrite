import { GroupId } from 'src/common/types/utilTypes/Brand';
import { PostAggregation } from '../feeds/feeds';
import { Group } from 'src/modules/community/group';
import { Event } from 'src/modules/community/event';
import { endUserAggregation } from '../utils/enduser.aggregation';

export type GroupPostAggregation = {
  groupId: GroupId;
} & PostAggregation;

export type GroupAggregation = endUserAggregation & Omit<Group, 'endUserId'>;

export type EventAggregation = endUserAggregation & Omit<Event, 'endUserId'>;

export type GroupMemberAggregation = endUserAggregation &
  Omit<Event, 'endUserId'>;
