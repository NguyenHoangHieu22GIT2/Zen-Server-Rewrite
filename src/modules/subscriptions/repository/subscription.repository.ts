import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Subscription } from '../entities/subscription.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubscriptionRepository extends GenericRepositoryMongodb<Subscription> {
  constructor(
    @InjectModel(Subscription.name)
    readonly subscriptionModel: Model<Subscription>,
  ) {
    super(subscriptionModel);
  }
}
