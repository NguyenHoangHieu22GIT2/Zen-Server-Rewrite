import { Inject, Injectable } from '@nestjs/common';
import { ConversationRepository } from '../repository/conversation.repository';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { IConversationService } from './conversation.interface.service';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { ConversationId, EndUserId } from 'src/common/types/utilTypes';
import { Conversation } from '../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { ConversationDefaultName } from 'src/common/constants/constants';

@Injectable()
export class ConversationService implements IConversationService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly conversationRepository: ConversationRepository,
  ) {}

  public async createConversation(
    leaderId: EndUserId,
    endUserIds: EndUserId[],
  ): Promise<DocumentMongodbType<Conversation>> {
    const conversation = await this.conversationRepository.create({
      name: ConversationDefaultName,
    });
  }

  public async getConversation(
    conversationId: ConversationId,
  ): Promise<DocumentMongodbType<Conversation>> {}

  public async getConversations(
    endUserId: EndUserId,
    query: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Conversation>> {}

  public async updateConversation(
    conversationId: ConversationId,
    opts: Partial<Conversation>,
  ): Promise<DocumentMongodbType<Conversation>> {}
}
