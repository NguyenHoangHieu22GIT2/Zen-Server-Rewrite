import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';
export class getPostsDto {
  @ApiProperty({
    title: 'Limit for queries',
    required: true,
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @Transform((opts) => {
    return Number(opts.value);
  })
  limit: number;

  @ApiProperty({
    title: 'skip for queries',
    required: true,
    example: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @Transform((opts) => {
    return Number(opts.value);
  })
  skip: 0;

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
