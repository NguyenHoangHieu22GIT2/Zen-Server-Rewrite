import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Message } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class MessageRepository extends GenericRepositoryMongodb<Message> {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {
    super(messageModel);
  }
}
