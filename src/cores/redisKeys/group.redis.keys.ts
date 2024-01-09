import { Types } from 'mongoose';

// HASH
export const groupKey = (groupId: Types.ObjectId) => `group#${groupId}`;

export const EventKey = (eventId: Types.ObjectId) => `Event#${eventId}`;

//HYPERLOGLOG
export const groupMembersKey = (groupId: Types.ObjectId) =>
  `groupMembers#${groupId}`;

export const groupPostsKey = (groupId: Types.ObjectId) =>
  `groupPosts#${groupId}`;

export const groupEventsKey = (groupId: Types.ObjectId) =>
  `groupEvents#${groupId}`;
