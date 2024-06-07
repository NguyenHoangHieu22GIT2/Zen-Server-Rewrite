import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';

export class FindByIdEndUserDto {
  @ApiProperty({
    title: "User's Id",
    type: String,
  })
  @Transform((opts) => {
    return checkToConvertToMongoIdOrThrowError<EndUserId>({
      id: opts.value,
      returnError: true,
    });
  })
  endUserId: EndUserId;
}
