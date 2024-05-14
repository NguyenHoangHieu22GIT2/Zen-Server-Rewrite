import { Controller, UseGuards, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth';
import {
  IConversationService,
  IConversationServiceString,
} from './service/conversation.interface.service';
import { EnduserServiceUnstable } from 'src/modules/users/enduser';

@ApiTags('Conversations')
@UseGuards(LoggedInGuard)
@Controller('conversation')
export class ConversationController {
  constructor(
    @Inject(IConversationServiceString)
    private readonly conversationService: IConversationService,
    private readonly endUserService: EnduserServiceUnstable,
  ) {}

  @Post()
  public async createConversation(
    @Req() req: RequestUser,
    @Body() body: CreateConversationDto,
  ) {
    const conversation = await this.conversationService.createConversation(
      req.user._id,
      body.userIds,
    );
  }

  // @Get()
  // getConversations(@Req() req: RequestUser, @Query() query: QueryLimitSkip) {
  //   const conversations = this.conversationService.getConversations(
  //     req.user._id,
  //     query,
  //   );

  //   return conversations;
  // }
}
