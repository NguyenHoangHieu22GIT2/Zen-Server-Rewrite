import { GroupId } from 'src/common/types/utilTypes/Brand';
import { PostAggregation } from '../feeds/feeds';

export type GroupPostAggregation = {
  groupId: GroupId;
} & PostAggregation;
