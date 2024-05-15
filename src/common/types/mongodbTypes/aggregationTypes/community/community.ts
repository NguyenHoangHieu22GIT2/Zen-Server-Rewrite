import { GroupId } from 'src/common/types/utilTypes/Brand';
import { PostAggregation } from '../feeds/feeds';
import { Group } from 'src/modules/community/group';
import { Event } from 'src/modules/community/event';
import { EndUserAggregation } from '../utils/enduser.aggregation';

export type GroupPostAggregation = {
  groupId: GroupId;
} & PostAggregation;

export type GroupAggregation = EndUserAggregation & Omit<Group, 'endUserId'>;

export type EventAggregation = EndUserAggregation & Omit<Event, 'endUserId'>;

export type GroupMemberAggregation = EndUserAggregation &
  Omit<Event, 'endUserId'>;
