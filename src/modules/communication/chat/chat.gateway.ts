import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { JoinConversation } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';
import { ConversationService } from '../conversation';
import { MessageService } from '../message';
import { socketOn } from './path/socket.on';
import { Inject } from '@nestjs/common';
import { IConversationServiceString } from '../conversation/service/conversation.interface.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() socketOfAll: Server;

  constructor(
    @Inject(IConversationServiceString)
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
  ) {}

  @SubscribeMessage(socketOn.joinConversation)
  joinConversation(
    @ConnectedSocket() socketOfUser: Socket,
    @MessageBody() joinConversation: JoinConversation,
  ) {
    const conversationId = joinConversation.conversationId.toString();
    if (socketOfUser.rooms.has(conversationId)) {
      return;
    }

    socketOfUser.join(conversationId);
  }
}
