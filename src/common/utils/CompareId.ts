import { UnauthorizedException } from '@nestjs/common';
import { EndUserId } from '../types/utilTypes/Brand';

export function CompareId(userIdOne: EndUserId, userIdTwo: EndUserId) {
  if (!userIdOne.equals(userIdTwo)) {
    throw new UnauthorizedException("You don't have access to do this action!");
  }
}
