import {
  ConversationId,
  EndUserId,
  MessageId,
} from 'src/common/types/utilTypes';
import { SendMessageDto } from '../../chat/dto/send-message.dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Message } from '../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export const IMessageServiceString = 'IMessageService';

export interface IMessageService {
  createMessage(
    endUserId: EndUserId,
    sendMessageDto: SendMessageDto,
  ): Promise<DocumentMongodbType<Message>>;

  getMessages(
    conversationId: ConversationId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Message>[]>;

  deleteMessage(
    endUserId: EndUserId,
    messageId: MessageId,
  ): Promise<DocumentMongodbType<Message>>;
}
