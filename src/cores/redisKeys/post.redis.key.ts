import { Types } from 'mongoose';

export const postKey = (postId: Types.ObjectId) => `post#${postId}`;

export const viewsKey = (postId: Types.ObjectId) => `views#${postId}`;

export const likesKey = (postId: Types.ObjectId) => `likes#${postId}`;
