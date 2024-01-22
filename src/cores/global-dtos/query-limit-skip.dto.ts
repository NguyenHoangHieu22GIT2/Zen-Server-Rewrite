import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class QueryLimitSkip {
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
}
