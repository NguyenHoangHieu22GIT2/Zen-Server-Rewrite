import { Inject, Injectable } from '@nestjs/common';
import { ConversationRepository } from '../repository/conversation.repository';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { IConversationService } from './conversation.interface.service';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { ConversationId, EndUserId } from 'src/common/types/utilTypes';
import { Conversation } from '../entities';
import { ConversationDefaultName } from 'src/common/constants/constants';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { noObj } from 'src/common/utils';

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
    let conversation;
    conversation = await this.conversationRepository.findOne({
      endUserIds: { $eq: endUserIds },
    });
    if (conversation) {
      return conversation;
    }
    conversation = await this.conversationRepository.create({
      name: ConversationDefaultName,
      endUserIds,
    });
    return conversation;
  }

  public async getConversation(
    endUserId: EndUserId,
    conversationId: ConversationId,
  ): Promise<DocumentMongodbType<Conversation>> {
    const conversation = await this.conversationRepository.findOne({
      endUserIds: endUserId,
      _id: conversationId,
    });
    return conversation;
  }

  public async getConversations(
    endUserId: EndUserId,
    query: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Conversation>[]> {
    const conversations = await this.conversationRepository.find(
      {
        endUserIds: endUserId,
      },
      noObj,
      { limit: query.limit, skip: query.skip },
    );
    return conversations;
  }

  public async updateConversation(
    endUserId: EndUserId,
    conversationId: ConversationId,
    opts: Partial<Conversation>,
  ): Promise<DocumentMongodbType<Conversation>> {
    const conversation = await this.conversationRepository.findOne({
      _id: conversationId,
      endUserIds: endUserId,
    });

    Object.assign(conversation, opts);
    return conversation.save();
  }
}
