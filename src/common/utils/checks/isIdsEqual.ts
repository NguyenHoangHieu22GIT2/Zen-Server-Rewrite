import { EndUserId } from '../../types/utilTypes/Brand';

export function isIdsEqual(userIdOne: EndUserId, userIdTwo: EndUserId) {
  return userIdOne.toString() === userIdTwo.toString();
}
