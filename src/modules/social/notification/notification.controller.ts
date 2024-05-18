import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  INotificationService,
  INotificationServiceString,
} from './services/notification.interface.service';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/modules/auth';
import { RequestUser } from 'src/common/types/utilTypes';
import { CreateNotificationDto } from './dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { FindNotificationDto } from './dto/find-notification.dto';

@Controller('notification')
@ApiTags('Notification')
@UseGuards(LoggedInGuard)
export class NotificationController {
  constructor(
    @Inject(INotificationServiceString)
    private readonly notificationService: INotificationService,
  ) {}

  @Post()
  public async createNotification(
    @Req() req: RequestUser,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const notification = await this.notificationService.createNotification(
      req.user._id,
      createNotificationDto,
    );
    return notification;
  }

  @Get()
  public async getNotifications(
    @Req() req: RequestUser,
    @Param() queryLimitSkip: QueryLimitSkip,
  ) {
    const notifications = await this.notificationService.getNotifications(
      req.user._id,
      queryLimitSkip,
    );
    return notifications;
  }

  @Get(':notificationId')
  public async getNotification(
    @Req() req: RequestUser,
    @Query() findNotificationDto: FindNotificationDto,
  ) {
    const notification = await this.notificationService.getNotification(
      req.user._id,
      findNotificationDto.notificationId,
    );
    return notification;
  }
}
