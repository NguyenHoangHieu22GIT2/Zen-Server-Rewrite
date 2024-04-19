import { Controller, Inject } from '@nestjs/common';
import { FriendUnstableService } from './services/unstable/friend.unstable.service';
import { IFriendUnstableServiceString } from './services';

@Controller('friend')
export class FriendController {
  constructor(
    @Inject(IFriendUnstableServiceString)
    private readonly friendService: FriendUnstableService,
  ) {}
}
