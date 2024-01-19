import { IsString } from 'class-validator';
import { FindByIdEndUserDto } from './find-one.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUsernameDto extends FindByIdEndUserDto {
  @ApiProperty({
    title: "User's username to change to",
    type: String,
    examples: ['Mikey', 'Anne', 'Elizabeth'],
  })
  @IsString()
  username: string;
}
