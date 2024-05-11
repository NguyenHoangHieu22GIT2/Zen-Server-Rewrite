import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  IFriendUnstableService,
  IFriendUnstableServiceString,
} from './services';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth';
import { FindFriendDto } from './dto';
import { RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { FindFriendsByName } from './dto/find-friends-by-name.dto';

/**
 * leaderId => the user doing the action
 *
 * friendId => the user getting actioned
 */
@Controller('friend')
@ApiTags('friends')
@UseGuards(LoggedInGuard)
export class FriendController {
  constructor(
    @Inject(IFriendUnstableServiceString)
    private readonly friendService: IFriendUnstableService,
  ) {}

  @Get('recommendation')
  public async getFriendsRecommendation(
    @Req() req: RequestUser,
    @Query() query: QueryLimitSkip,
  ) {
    const friends = await this.friendService.getRecommendation(
      req.user._id,
      query,
    );
    return friends;
  }

  @Put()
  public async removeFriend(
    @Req() req: RequestUser,
    @Body() findFriendDto: FindFriendDto,
  ) {
    const friendResult = await this.friendService.removeFriend(
      req.user._id,
      findFriendDto.endUserId,
    );
    return friendResult;
  }

  @Get('search-by-name/:name')
  public async searchFriendsByName(
    @Req() req: RequestUser,
    @Param() param: FindFriendsByName,
    @Query() query: QueryLimitSkip,
  ) {
    const friends = await this.friendService.findFriendsByName(
      req.user._id,
      param.username,
      query,
    );
    return friends;
  }

  @Get()
  public async getFriendList(
    @Req() req: RequestUser,
    @Query() query: QueryLimitSkip,
  ) {
    const friendList = await this.friendService.getFriendList(
      req.user._id,
      query,
    );
    return friendList;
  }
}
