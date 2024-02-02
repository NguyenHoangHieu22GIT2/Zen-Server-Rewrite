import { UnauthorizedException } from '@nestjs/common';
import { EndUserId } from '../types/utilTypes/Brand';

export function checkAuthorized({
  userActionId,
  userHasPostId,
}: {
  userActionId: EndUserId;
  userHasPostId: EndUserId;
}) {
  if (!userHasPostId.equals(userActionId)) {
    throw new UnauthorizedException("You don't have access to do this action!");
  }
}
