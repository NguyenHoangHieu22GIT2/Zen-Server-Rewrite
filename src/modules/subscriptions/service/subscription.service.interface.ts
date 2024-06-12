import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Subscription } from '../entities/subscription.entity';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { EndUserId, SubscriptionId } from 'src/common/types/utilTypes';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

export const ISubscriptionServiceString = 'ISubscriptionService';

export interface ISubscriptionService {
  getSubscriptions(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Subscription>[]>;

  findSubscription(
    endUserId: EndUserId,
    subscriptionId: SubscriptionId,
  ): Promise<DocumentMongodbType<Subscription>>;

  createSubscription(
    endUserId: EndUserId,
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<DocumentMongodbType<Subscription>>;

  deleteSubscription(
    endUserId: EndUserId,
    subscriptionId: SubscriptionId,
  ): Promise<DocumentMongodbType<Subscription>>;
}
