import { IsString } from 'class-validator';
import { ConversationId } from 'src/common/types/utilTypes';

export class JoinConversation {
  @IsString()
  conversationId: ConversationId;
}
