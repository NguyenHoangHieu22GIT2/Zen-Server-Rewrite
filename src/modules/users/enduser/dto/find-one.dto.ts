import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/convertToMongodbId';

export class FindByIdEndUserDto {
  @ApiProperty({
    title: "User's Id",
    type: String,
  })
  @IsDefined({ message: 'Wrong Id format in mongodb' })
  @Transform((opts) => {
    return checkToConvertToMongoIdOrThrowError<EndUserId>(opts.value);
  })
  id: EndUserId;
}
