import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Subscription } from '../entities/subscription.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SubscriptionRepository extends GenericRepositoryMongodb<Subscription> {
  constructor(@Inject() readonly subscriptionModel: Model<Subscription>) {
    super(subscriptionModel);
  }
}
