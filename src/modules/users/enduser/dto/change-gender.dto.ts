import { IsString } from 'class-validator';
import { FindByIdEndUserDto } from './find-one.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeGenderDto extends FindByIdEndUserDto {
  @ApiProperty({
    title: "User's Gender to change to",
    type: String,
    examples: ['male', 'female', 'other'],
  })
  @IsString()
  gender: string;
}
