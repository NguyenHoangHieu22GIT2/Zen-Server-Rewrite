import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FriendUnstableService } from './services/unstable/friend.unstable.service';
import { IFriendUnstableServiceString } from './services';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth';
import { CreateFriendDto } from './dto';

@Controller('friend')
@ApiTags('friends')
@UseGuards(LoggedInGuard)
export class FriendController {
  constructor(
    @Inject(IFriendUnstableServiceString)
    private readonly friendService: FriendUnstableService,
  ) {}

  @Get('recommendation')
  getFriendsRecommendation() {}

  @Post()
  addFriend(@Body() CreateFriendDto: CreateFriendDto) {}

  @Put()
  removeFriend() {}

  @Get('search-by-name')
  searchFriendsByName() {}

  @Get()
  getFriendList() {}
}
