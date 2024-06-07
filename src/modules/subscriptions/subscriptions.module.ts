import { Module } from '@nestjs/common';
import { SubscriptionsService } from './service/subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { SubscriptionRepository } from './repository/subscription.repository';
import { ISubscriptionServiceString } from './service/subscription.service.interface';

@Module({
  controllers: [SubscriptionsController],
  providers: [
    { provide: ISubscriptionServiceString, useClass: SubscriptionsService },
    { provide: BaseRepositoryName, useClass: SubscriptionRepository },
  ],
})
export class SubscriptionsModule {}
