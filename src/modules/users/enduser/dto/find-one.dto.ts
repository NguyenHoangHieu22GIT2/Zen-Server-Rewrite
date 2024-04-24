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
    console.log('This is the optsvalue', opts.value);
    return checkToConvertToMongoIdOrThrowError<EndUserId>({
      id: opts.value,
      returnError: true,
    });
  })
  endUserId: EndUserId;
}
