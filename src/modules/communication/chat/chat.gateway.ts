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
import { IMessageServiceString, MessageService } from '../message';
import { socketOn } from './path/socket.on';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { IConversationServiceString } from '../conversation/service/conversation.interface.service';
import { SendMessageDto } from './dto/send-message.dto';
import { socketEmit } from './path/socket.emit';
import { DeleteMessageDto } from './dto/delete-message.dto';
import mongoose from 'mongoose';
import { ConversationId, EndUserId } from 'src/common/types/utilTypes';
// import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() socketOfAll: Server;

  constructor(
    @Inject(IConversationServiceString)
    private readonly conversationService: ConversationService,

    @Inject(IMessageServiceString)
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

  @SubscribeMessage(socketOn.sendMessage)
  public async sendMessage(@MessageBody() body: SendMessageDto) {
    body.endUserId = new mongoose.Types.ObjectId(body.endUserId) as EndUserId;
    body.conversationId = new mongoose.Types.ObjectId(
      body.conversationId,
    ) as ConversationId;
    const conversation = await this.conversationService.getConversation(
      body.endUserId,
      body.conversationId,
    );
    if (!conversation) {
      throw new UnauthorizedException(
        'You are not allowed to add message here!',
      );
    }

    const message = await this.messageService.createMessage(
      body.endUserId,
      body,
    );

    this.socketOfAll
      .to(body.conversationId.toString())
      .emit(socketEmit.sendMessage, message.toJSON());
  }

  @SubscribeMessage(socketOn.deleteMessage)
  public async deleteMessage(@MessageBody() body: DeleteMessageDto) {
    const message = await this.messageService.deleteMessage(
      body.endUserId,
      body.messageId,
    );
    return message;
  }
}
