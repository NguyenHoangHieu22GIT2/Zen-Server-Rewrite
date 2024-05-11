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
import { GetFriendsRecommendationSwaggerAPIDecorators } from 'src/documents/swagger-api/friends/get-friends-recommendation.api';
import { RemoveFriendSwaggerAPIDecorators } from 'src/documents/swagger-api/friends/remove-friend.api';
import { SearchFriendsByNameSwaggerAPIDecorators } from 'src/documents/swagger-api/friends/search-friends-by-name.api';
import { GetFriendListSwaggerAPIDecorators } from 'src/documents/swagger-api/friends/get-friend-list.api';

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

  @GetFriendsRecommendationSwaggerAPIDecorators()
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

  @RemoveFriendSwaggerAPIDecorators()
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

  @SearchFriendsByNameSwaggerAPIDecorators()
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
  @GetFriendListSwaggerAPIDecorators()
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
