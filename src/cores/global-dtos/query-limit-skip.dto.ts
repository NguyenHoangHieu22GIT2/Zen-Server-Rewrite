import { ApiProperty } from '@nestjs/swagger';
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
  limit: number;

  @ApiProperty({
    title: 'skip for queries',
    required: true,
    example: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  skip: 0;
}
