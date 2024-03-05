import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsString, MinLength } from 'class-validator';
import { GroupId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class CreateEventDto {
  @ApiProperty({
    title: 'Group Id to create event',
    required: true,
  })
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  @IsString()
  groupId: GroupId;
  @ApiProperty({
    title: "event's Name",
    required: true,
    example: 'ETC Event',
  })
  @MinLength(1)
  @IsString()
  name: string;

  @ApiProperty({
    title: "event's description",
    required: true,
    example: 'ETC Event is one of the best event ever',
  })
  @MinLength(1)
  @IsString()
  description: string;

  @ApiProperty({
    title: "event's Date to start",
    required: true,
  })
  @IsDate()
  @Transform((opts) => {
    return new Date(opts.value);
  })
  startAt: Date;

  @ApiProperty({
    title: "event's Date to end",
    required: true,
  })
  @IsDate()
  @Transform((opts) => {
    return new Date(opts.value);
  })
  endAt: Date;
}
