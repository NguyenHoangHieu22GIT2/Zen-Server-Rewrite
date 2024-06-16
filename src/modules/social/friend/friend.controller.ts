import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth';
import { RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { FindFriendsByName } from './dto/find-friends-by-name.dto';
import { GetFriendsRecommendationSwaggerAPIDecorators } from 'src/documents/swagger-api/friends/get-friends-recommendation.api';
import { SearchFriendsByNameSwaggerAPIDecorators } from 'src/documents/swagger-api/friends/search-friends-by-name.api';
import { GetFriendListSwaggerAPIDecorators } from 'src/documents/swagger-api/friends/get-friend-list.api';
import { IFriendService, IFriendServiceString } from './services';
import { FindByIdEndUserDto } from 'src/modules/users/enduser';

/**
 * leaderId => the user doing the action
 *
 * friendId => the user getting actioned
 */
@Controller('friend')
@ApiTags('Friends')
@UseGuards(LoggedInGuard)
export class FriendController {
  constructor(
    @Inject(IFriendServiceString)
    private readonly friendService: IFriendService,
  ) {}

  @Delete(':endUserId')
  public async deleteFriend(
    @Req() req: RequestUser,
    @Param() param: FindByIdEndUserDto,
  ) {
    const friend = await this.friendService.removeFriend(
      req.user._id,
      param.endUserId,
    );
    return friend;
  }

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

  @GetFriendListSwaggerAPIDecorators()
  @Get(':endUserId')
  public async getFriendListOfUser(
    @Req() req: RequestUser,
    @Param() param: FindByIdEndUserDto,
    @Query() query: QueryLimitSkip,
  ) {
    const friendList = await this.friendService.getFriendList(
      param.endUserId,
      query,
    );
    return friendList;
  }
}
