import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ConversationModule } from '../conversation';
import { MessageModule } from '../message';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [ConversationModule, MessageModule],
})
export class ChatModule {}
