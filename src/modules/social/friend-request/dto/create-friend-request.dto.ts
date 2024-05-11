import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { EndUserId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class CreateFriendRequestDto {
  @ApiProperty({
    title: 'endUserId',
    required: true,
    type: String,
  })
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  endUserId: EndUserId;
}
