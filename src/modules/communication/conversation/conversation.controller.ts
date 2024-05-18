import {
  Controller,
  UseGuards,
  Inject,
  Req,
  Body,
  Post,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth';
import {
  IConversationService,
  IConversationServiceString,
} from './service/conversation.interface.service';
import { CreateConversationDto } from './dto';
import { EndUserId, RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { FindConversationDto } from './dto/find-conversation.dto';
import mongoose from 'mongoose';

@ApiTags('Conversations')
@UseGuards(LoggedInGuard)
@Controller('conversation')
export class ConversationController {
  constructor(
    @Inject(IConversationServiceString)
    private readonly conversationService: IConversationService,
  ) {}

  @Post()
  public async createConversation(
    @Req() req: RequestUser,
    @Body() body: CreateConversationDto,
  ) {
    body.userIds = body.userIds.map(
      (userId) => new mongoose.Types.ObjectId(userId) as EndUserId,
    );
    const conversation = await this.conversationService.createConversation(
      req.user._id,
      body.userIds,
    );
    return conversation;
  }

  @Get()
  public async getConversations(
    @Req() req: RequestUser,
    @Query() query: QueryLimitSkip,
  ) {
    const conversations = await this.conversationService.getConversations(
      req.user._id,
      query,
    );

    return conversations;
  }

  @Get(':conversationId')
  public async getConversation(
    @Req() req: RequestUser,
    @Param() param: FindConversationDto,
  ) {
    const conversation = await this.conversationService.getConversation(
      req.user._id,
      param.conversationId,
    );
    return conversation;
  }
}
