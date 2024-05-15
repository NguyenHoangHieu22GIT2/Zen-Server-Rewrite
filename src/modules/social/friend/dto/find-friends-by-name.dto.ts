import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindFriendsByName {
  @ApiProperty({
    title: 'username',
    type: String,
    required: true,
    example: 'Hieu',
  })
  @IsString()
  username: string;
}
