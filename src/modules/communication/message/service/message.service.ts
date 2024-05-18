import { Inject, Injectable } from '@nestjs/common';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { MessageRepository } from '../repository/message.repository';
import { IMessageService } from './message.interface.service';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import {
  ConversationId,
  EndUserId,
  MessageId,
} from 'src/common/types/utilTypes';
import { SendMessageDto } from '../../chat/dto/send-message.dto';
import { Message } from '../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { emptyObj } from 'src/common/utils';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly messageRepository: MessageRepository,
  ) {}

  public async createMessage(
    endUserId: EndUserId,
    sendMessageDto: SendMessageDto,
  ): Promise<DocumentMongodbType<Message>> {
    const message = await this.messageRepository.create({
      endUserId,
      content: sendMessageDto.content,
      conversationId: sendMessageDto.conversationId,
    });
    return message;
  }

  public async getMessages(
    conversationId: ConversationId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Message>[]> {
    const messages = await this.messageRepository.find(
      { conversationId },
      emptyObj,
      {
        limit: queryLimitSkip.limit,
        skip: queryLimitSkip.skip,
        sort: { createdAt: -1 },
      },
    );
    return messages.reverse();
  }

  public async deleteMessage(
    endUserId: EndUserId,
    messageId: MessageId,
  ): Promise<DocumentMongodbType<Message>> {
    const message = await this.messageRepository.delete({
      endUserId,
      _id: messageId,
    });
    return message;
  }
}
