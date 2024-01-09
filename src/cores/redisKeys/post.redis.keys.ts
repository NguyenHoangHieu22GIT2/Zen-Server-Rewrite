import { Types } from 'mongoose';

// HASH
export const postKey = (postId: Types.ObjectId) => `post#${postId}`;

// HYPERLOGLOG
export const viewsKey = (postId: Types.ObjectId) => `views#${postId}`;

export const likesKey = (postId: Types.ObjectId) => `likes#${postId}`;
