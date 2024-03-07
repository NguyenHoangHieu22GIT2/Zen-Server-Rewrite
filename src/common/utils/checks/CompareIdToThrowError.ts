import { UnauthorizedException } from '@nestjs/common';
import { EndUserId } from '../../types/utilTypes/Brand';

export function CompareIdToThrowError(
  userIdOne: EndUserId,
  userIdTwo: EndUserId,
  message?: string,
) {
  if (!userIdOne.equals(userIdTwo)) {
    throw new UnauthorizedException(
      message || "You don't have access to do this action!",
    );
  }
}
