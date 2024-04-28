import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ChangeInformationDto {
  @ApiProperty({
    title: "User's username to change to",
    type: String,
    examples: ['Mikey', 'Anne', 'Elizabeth'],
    required: false,
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    title: "User's Gender to change to",
    type: String,
    examples: ['male', 'female', 'other'],
    required: false,
  })
  @Transform((opts) => {
    let value = opts.value;
    if (value !== 'male' && value !== 'female' && value !== 'other') {
      value = 'other';
    }
    return value;
  })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty({
    title: "User's description to change to",
    type: String,
    example: 'This is just a description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
