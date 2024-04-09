import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';

export class GetUserPostsDto extends QueryLimitSkip {
  @ApiProperty({
    title: 'group Id',
    required: false,
  })
  @Transform(({ value }) => {
    return checkToConvertToMongoIdOrThrowError({
      id: value,
      returnError: true,
    });
  })
  @IsString()
  @IsOptional()
  groupId?: string;
}
