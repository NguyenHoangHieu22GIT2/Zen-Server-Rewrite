import { Types } from 'mongoose';
import { NotificationType } from '../entities';
import { Transform } from 'class-transformer';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NounEntity, NounType } from '../entities/noun.entity';
import { Optional } from '@nestjs/common';

const notificationTypes: NotificationType[] = [
  'like',
  'comment',
  'mention',
  'friend-request',
];

export class NounDto implements NounEntity {
  @ApiProperty({
    title: 'id of entity',
    required: false,
    type: String,
    default: '',
  })
  @Transform(checkMongodbIdInTransformToThrowError)
  _id: Types.ObjectId;

  @ApiProperty({
    title: 'id of entity',
    required: false,
    type: String,
    default: '',
  })
  @IsString()
  name: string;

  @ApiProperty({
    title: 'id of entity',
    required: false,
    type: String,
    default: '',
  })
  type: NounType;

  @ApiProperty({
    title: 'id of entity',
    required: false,
    type: String,
    default: '',
  })
  @IsString()
  @Optional()
  image: string;
}
