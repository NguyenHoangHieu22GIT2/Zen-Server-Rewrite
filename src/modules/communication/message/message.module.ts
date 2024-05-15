import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { MessageRepository } from './repository/message.repository';
import { IMessageServiceString } from './service/message.interface.service';
import { MessageService } from './service/message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities';
import { ConversationModule } from '../conversation';

@Module({
  controllers: [MessageController],
  providers: [
    {
      provide: BaseRepositoryName,
      useClass: MessageRepository,
    },
    {
      provide: IMessageServiceString,
      useClass: MessageService,
    },
  ],
  exports: [
    {
      provide: IMessageServiceString,
      useClass: MessageService,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ConversationModule,
  ],
})
export class MessageModule {}
