import { Notification, NotificationType } from '../entities';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { NounDto } from './noun.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CreateNotificationDto implements Partial<Notification> {
  // We can use token from user to get the ID
  // @Transform(checkMongodbIdInTransformToThrowError)
  @ValidateNested({ each: true })
  @Type(() => NounDto)
  @ApiProperty({
    title: 'Subject',
    type: NounDto,
  })
  subject: NounDto;

  @IsString()
  verb: NotificationType;

  @ValidateNested({ each: true })
  @Type(() => NounDto)
  @ApiProperty({
    title: 'directObject',
    type: NounDto,
  })
  directObject: NounDto;

  @ValidateNested({ each: true })
  @Type(() => NounDto)
  @ApiProperty({
    title: 'indirectObject',
    type: NounDto,
  })
  indirectObject: NounDto;

  @ValidateNested({ each: true })
  @Type(() => NounDto)
  @ApiProperty({
    title: 'prepObject',
    type: NounDto,
  })
  @Optional()
  prepObject?: NounDto;

  @IsString()
  referenceLink: string;
}
