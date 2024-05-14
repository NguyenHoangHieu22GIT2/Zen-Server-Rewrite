import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { ConversationId, EndUserId } from 'src/common/types/utilTypes';
import { Conversation } from '../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export const IConversationServiceString = 'IConversationService';

export interface IConversationService<T = Conversation> {
  createConversation(
    leaderId: EndUserId,
    endUserIds: EndUserId[],
  ): Promise<DocumentMongodbType<T>>;

  // I don't think we can delete conversation simply:
  // 1. One user can not delete the conversation (Just a security...)
  // 2. Even if they both agree to delete, we can't since the information can be crucial for AI or investigation
  // deleteConversation(
  //   conversationId: ConversationId,
  // ): Promise<DocumentMongodbType<T>>;

  getConversation(
    conversationId: ConversationId,
  ): Promise<DocumentMongodbType<T>>;

  getConversations(
    endUserId: EndUserId,
    query: QueryLimitSkip,
  ): Promise<DocumentMongodbType<T>>;

  updateConversation(
    conversationId: ConversationId,
    opts: Partial<Conversation>,
  ): Promise<DocumentMongodbType<T>>;
}
