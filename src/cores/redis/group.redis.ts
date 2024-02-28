import { Types } from 'mongoose';
import { Group } from 'src/modules/community/group/entities/group.entity';
import { RedisClient } from './client.redis';
import {
  EventKey,
  groupEventsKey,
  groupKey,
  groupMembersKey,
  groupPostsKey,
} from '../redisKeys/group.redis.keys';
import { Event } from 'src/modules/community/event/entities/event.entity';
import { ConvertObjectToHash } from 'src/common/utils/';

export class GroupRedis {
  // HASH
  static async groupConvertToRedisTypeThenHSET(
    groupId: Types.ObjectId,
    group: Group,
  ) {
    const convertedGroup = ConvertObjectToHash(group);
    return RedisClient.HSET(groupKey(groupId), convertedGroup);
  }

  static async eventConvertToRedisTypeThenHSET(
    eventId: Types.ObjectId,
    event: Event,
  ) {
    const convertedEvent = ConvertObjectToHash(event);
    return RedisClient.HSET(EventKey(eventId), convertedEvent);
  }

  //HYPERLOGLOG
  static async groupMembersPFADD(
    groupId: Types.ObjectId,
    userId: Types.ObjectId,
  ) {
    return RedisClient.PFADD(groupMembersKey(groupId), userId.toString());
  }
  static async groupMembersPFCOUNT(groupId: Types.ObjectId) {
    return RedisClient.PFCOUNT(groupMembersKey(groupId));
  }

  static async groupPostsPFADD(
    groupId: Types.ObjectId,
    postId: Types.ObjectId,
  ) {
    return RedisClient.PFADD(groupPostsKey(groupId), postId.toString());
  }

  static async groupPostsPFCOUNT(groupId: Types.ObjectId) {
    return RedisClient.PFCOUNT(groupPostsKey(groupId));
  }

  static async groupEventPFADD(
    groupId: Types.ObjectId,
    eventId: Types.ObjectId,
  ) {
    return RedisClient.PFADD(groupEventsKey(groupId), eventId.toString());
  }

  static async groupEventPFCOUNT(groupId: Types.ObjectId) {
    return RedisClient.PFCOUNT(groupEventsKey(groupId));
  }
}
