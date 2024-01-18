import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class FindByIdEndUserDto {
  @ApiProperty({
    title: "End user's id",
    type: String,
    required: true,
    example: '65a7dd2afc9b699c621363a9',
    default: '65a7dd2afc9b699c621363a9',
  })
  @IsString()
  @Transform((opts) => {
    console.log(opts.value);
    return 'Hello' + opts.value;
  })
  userId: string;
}
