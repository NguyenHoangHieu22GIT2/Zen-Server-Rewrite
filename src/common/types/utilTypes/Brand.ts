import { Types } from 'mongoose';

declare const brand: unique symbol;

export type Brand<TType, TBrand> = TType & { [brand]: TBrand };

export type EndUserId = Brand<Types.ObjectId, 'EndUserId'>;

export type AdminId = Brand<Types.ObjectId, 'AdminId'>;

export type FriendId = Brand<Types.ObjectId, 'FriendId'>;

export type PostId = Brand<Types.ObjectId, 'PostId'>;

export type GroupId = Brand<Types.ObjectId, 'GroupId'>;

export type CommentId = Brand<Types.ObjectId, 'CommentId'>;

export type ConversationId = Brand<Types.ObjectId, 'ConversationId'>;

export type MessageId = Brand<Types.ObjectId, 'MessageId'>;

export type ReportId = Brand<Types.ObjectId, 'ReportId'>;

export type LikeId = Brand<Types.ObjectId, 'LikeId'>;

export type EventId = Brand<Types.ObjectId, 'EventId'>;

export type NotificationId = Brand<Types.ObjectId, 'NotificationId'>;
