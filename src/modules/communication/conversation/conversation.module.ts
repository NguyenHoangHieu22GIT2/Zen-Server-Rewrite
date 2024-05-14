import { Module } from '@nestjs/common';
import { ConversationService } from './service/conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationRepository } from './repository/conversation.repository';
import { IConversationServiceString } from './service/conversation.interface.service';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from './entities';

@Module({
  controllers: [ConversationController],
  providers: [
    { provide: IConversationServiceString, useClass: ConversationService },
    { provide: BaseRepositoryName, useClass: ConversationRepository },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  exports: [
    { provide: IConversationServiceString, useClass: ConversationService },
  ],
})
export class ConversationModule {}
