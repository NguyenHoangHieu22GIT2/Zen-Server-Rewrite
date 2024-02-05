import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';

export class GetUserPostsDto extends QueryLimitSkip {
  @ApiProperty({
    title: 'end user Id',
    required: true,
  })
  @IsString()
  @Transform(({ value }) => {
    return checkToConvertToMongoIdOrThrowError({
      id: value,
      returnError: true,
    });
  })
  endUserId: EndUserId;
}
