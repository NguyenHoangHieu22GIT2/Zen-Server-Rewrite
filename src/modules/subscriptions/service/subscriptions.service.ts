import { Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { ISubscriptionService } from './subscription.service.interface';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { Subscription } from '../entities/subscription.entity';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, SubscriptionId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { SubscriptionRepository } from '../repository/subscription.repository';
import { noObj } from 'src/common/utils';

@Injectable()
export class SubscriptionsService implements ISubscriptionService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly subscriptionModel: SubscriptionRepository,
  ) {}

  public async deleteSubscription(
    endUserId: EndUserId,
    subscriptionId: SubscriptionId,
  ): Promise<DocumentMongodbType<Subscription>> {
    const subscription = await this.subscriptionModel.delete({
      _id: subscriptionId,
    });
    return subscription;
  }

  public async createSubscription(
    endUserId: EndUserId,
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<DocumentMongodbType<Subscription>> {
    const subscription = await this.subscriptionModel.create({
      name: createSubscriptionDto.name,
      price: createSubscriptionDto.price,
      description: createSubscriptionDto.description,
    });

    return subscription;
  }

  public async findSubscription(
    endUserId: EndUserId,
    subscriptionId: SubscriptionId,
  ): Promise<DocumentMongodbType<Subscription>> {
    const subscription = await this.subscriptionModel.findById(subscriptionId);
    return subscription;
  }

  public async getSubscriptions(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Subscription>[]> {
    const subscriptions = await this.subscriptionModel.find(noObj, noObj, {
      limit: queryLimitSkip.limit,
      skip: queryLimitSkip.skip,
    });
    return subscriptions;
  }
}
