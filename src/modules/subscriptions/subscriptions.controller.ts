import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Inject,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from '../auth';
import { RequestUser } from 'src/common/types/utilTypes';
import {
  ISubscriptionService,
  ISubscriptionServiceString,
} from './service/subscription.service.interface';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { FindSubscriptionDto } from './dto/find-subscription.dto';

@Controller('subscriptions')
@ApiTags('Subscriptions')
@UseGuards(LoggedInGuard)
export class SubscriptionsController {
  constructor(
    @Inject(ISubscriptionServiceString)
    private readonly subscriptionsService: ISubscriptionService,
  ) {}

  @Post()
  public async createSubscription(
    @Req() req: RequestUser,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const subscription = await this.subscriptionsService.createSubscription(
      req.user._id,
      createSubscriptionDto,
    );

    return subscription;
  }

  @Get(':subscription')
  public async findSubscription(
    @Req() req: RequestUser,
    @Param() param: FindSubscriptionDto,
  ) {
    const subscription = await this.subscriptionsService.findSubscription(
      req.user._id,
      param.subscriptionId,
    );
    return subscription;
  }

  @Get()
  public async getSubscriptions(
    @Req() req: RequestUser,
    @Query() queryLimitSkip: QueryLimitSkip,
  ) {
    const subscriptions = await this.subscriptionsService.getSubscriptions(
      req.user._id,
      queryLimitSkip,
    );
    return subscriptions;
  }
}
