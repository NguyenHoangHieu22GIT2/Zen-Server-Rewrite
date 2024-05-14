import { Inject, Injectable } from '@nestjs/common';
import { ConversationRepository } from '../repository/conversation.repository';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { IConversationService } from './conversation.interface.service';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { ConversationId, EndUserId } from 'src/common/types/utilTypes';
import { Conversation } from '../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { ConversationDefaultName } from 'src/common/constants/constants';
import { decorateAndConcatName } from 'src/common/utils';
import {
  IEndUserService,
  IEndUserServiceString,
} from 'src/modules/users/enduser';

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
      name: decorateAndConcatName(),
    });
  }
}
