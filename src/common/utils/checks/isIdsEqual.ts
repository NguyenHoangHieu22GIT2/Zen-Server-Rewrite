import { UnauthorizedException } from '@nestjs/common';
import { EndUserId } from '../../types/utilTypes/Brand';

export function isIdsEqual(userIdOne: EndUserId, userIdTwo: EndUserId) {
  if (!userIdOne.equals(userIdTwo)) {
    throw new UnauthorizedException(
      message || "You don't have access to do this action!",
    );
  }
}
