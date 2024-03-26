import { EndUserId, PostId } from 'src/common/types/utilTypes';

// HASH
export const postKey = (postId: PostId) => `post#${postId}`;

// HYPERLOGLOG
export const viewsKey = (postId: PostId) => `views#${postId}`;

export const likesKey = (postId: PostId) => `likes#${postId}`;

// Sorted Set

export const postSortedSetKey = (endUserId: EndUserId) => `posts#${endUserId}`;
